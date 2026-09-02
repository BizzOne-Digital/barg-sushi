const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAY_LABEL = { monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun" };

const to12h = (time) => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}:00 ${period}` : `${hour12}:${String(m).padStart(2, "0")} ${period}`;
};

// Groups consecutive days that share the same open/close/closed state,
// e.g. { monday..friday: 11-21 } -> "Mon – Fri: 11:00 AM – 9:00 PM"
export const groupHours = (hours) => {
  if (!hours) return [];
  const days = DAY_ORDER.map((key) => {
    const d = hours[key] || {};
    const range = d.closed ? "Closed" : `${to12h(d.open)} – ${to12h(d.close)}`;
    return { key, range };
  });

  const groups = [];
  for (const day of days) {
    const last = groups[groups.length - 1];
    if (last && last.range === day.range) {
      last.endKey = day.key;
    } else {
      groups.push({ startKey: day.key, endKey: day.key, range: day.range });
    }
  }

  return groups.map((g) => ({
    label: g.startKey === g.endKey ? DAY_LABEL[g.startKey] : `${DAY_LABEL[g.startKey]} – ${DAY_LABEL[g.endKey]}`,
    range: g.range,
  }));
};
