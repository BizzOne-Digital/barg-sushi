# Barg Sushi Bar & Grill — Full Stack Web Application

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Frontend:** React.js (CRA)
- **Image Upload:** Cloudinary
- **Email:** Nodemailer (Gmail App Password)
- **Auth:** JWT
- **Payments:** Stripe (ready to integrate)

---

## Project Structure

```
barg-sushi/
├── backend/
│   ├── config/          # DB + Cloudinary config
│   ├── controllers/     # Route logic
│   ├── data/            # Menu seed + seeder script
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── utils/           # Email service
│   ├── server.js
│   └── .env.example
└── frontend/
    └── src/
        ├── components/
        │   ├── admin/   # Admin layout + sidebar
        │   ├── customer/# Menu cards, hero, etc.
        │   └── common/  # Navbar, footer, protected routes
        ├── context/     # Auth + Cart context
        ├── pages/
        │   ├── admin/   # Dashboard, Menu, Orders, Reservations, Settings
        │   └── customer/# Home, Menu, Cart, Checkout, Booking, Contact, About
        └── utils/       # Axios config
```

---

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values (MongoDB URI, JWT secret, Cloudinary, Email)
npm run seed   # Seeds 97+ menu items + creates admin user
npm run dev    # Start on port 5000
```

**Admin credentials after seed:**
- Email: `admin@bargsushi.com`
- Password: `Admin@2024!`

### 2. Frontend

```bash
cd frontend
npm install
npm start      # Starts on port 3000
```

---

## Environment Variables (backend/.env)

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Any random secret string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `EMAIL_USER` | Gmail address |
| `EMAIL_PASS` | Gmail App Password (not account password) |
| `CLIENT_URL` | Frontend URL (e.g. http://localhost:3000) |

---

## Features

### Customer Side
- Homepage with hero, featured items, services
- Full menu with category filter + search (97+ items)
- Add to cart, cart management, order type selector
- Checkout (guest or logged in) — dine-in / takeout / delivery
- Online booking / reservations
- Contact form → email notification
- Account registration + login
- Order confirmation page with order number

### Admin Panel (`/admin`)
- Dashboard: live order stats, pending orders, pending reservations
- Menu Management: add / edit / delete items, toggle availability, upload images via Cloudinary, mark as featured
- Orders: filter by status, update order status, expand to view order details
- Reservations: confirm / cancel / complete bookings
- Settings: restaurant info, hours, hero text, delivery fee, tax rate, social links, special offer banner

---

## Menu Categories (97 items seeded)

1. Appetizers (7)
2. Salads (3)
3. Nigiri (4)
4. Sashimi (5)
5. Hand Rolls (2)
6. Our Classics (9)
7. Veggie Rolls (10)
8. Rolls (10)
9. Crispy Collection (5)
10. Light & Fresh (11)
11. Specialties (11)
12. Poke Bowls (5)
13. Tataki & Tartar (8)
14. Platters & Combos (5)
15. Drinks (4)

---

## Deployment Notes

- Deploy backend to **Railway** or **Render**
- Deploy frontend to **Vercel** or **Netlify**
- Set `REACT_APP_API_URL` in frontend to your backend URL
- MongoDB on **Atlas** (free tier works fine)
- Domain purchased via client (add-on)

---

## Multi-Language
The menu seed includes both English (`name`, `description`) and French (`nameFr`, `descriptionFr`) fields for all items. Frontend language toggle can be added using React Context + i18n library in Phase 2.
