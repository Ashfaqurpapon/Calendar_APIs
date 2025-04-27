# 📅 Calendar APIs

A simple Node.js + Express API for managing events with support for recurring events, update, delete, and authorization handling.

## 🚀 Features

- Create single or recurring events (daily, weekly, monthly).
- Update events:
  - Only this event
  - This and following events
  - All events in the series
- Delete events:
  - Only this event
  - This and following events
  - All events in the series
- Authorization:
  - Only event creators or admins can modify/delete.
- Validation for all request inputs using `express-validator`.
- Mock authentication middleware for testing.
- Custom error handling and consistent API responses.

## 🛠 Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- express-validator for request validation
- Custom error handling utilities

## 📂 Project Structure

```
src/
├── modules/
│   └── event/
│       ├── event_model.ts
│       ├── event_interface.ts
│       ├── event_service.ts
│       ├── event_controller.ts
│       ├── event_validation.ts
│       └── event_route.ts
├── middlewares/
│   ├── auth.ts         # Mock Authentication
│   └── validateRequest.ts
├── utils/
│   ├── catchAsync.ts   # Async Error Wrapper
│   └── sendResponse.ts # Consistent API Responses
├── errors/
│   └── AppError.ts
```

## 📚 API Endpoints

| Method | Endpoint                | Description          |
|--------|--------------------------|----------------------|
| POST   | `/api/events/`            | Create a new event   |
| PUT    | `/api/events/:eventId`     | Update an event      |
| DELETE | `/api/events/:eventId`     | Delete an event      |
| GET    | `/api/events/myEvents`     | Get my events        |

## 📋 Request Validations

### Create Event:
- `title` - required
- `startTime` - valid ISO8601 date required
- `endTime` - valid ISO8601 date required
- `startTime` must be earlier than `endTime`
- `participants` - optional array
- `recurrence.frequency` - optional, must be one of ['daily', 'weekly', 'monthly']

### Update Event:
- `title` - optional string
- `startTime`, `endTime` - optional ISO8601 dates
- `recurrenceUpdateOption` - required (`thisEvent`, `thisAndFollowing`, `allEvents`)
- Validation ensures updated `startTime` is before `endTime`

## 🧪 Mock Authentication

A simple middleware assigns a mock user to `req.user`.

You can switch between a normal user and an admin manually:

```typescript
const mockUsers = [
  { userId: 'user1_id', role: 'user' },
  { userId: 'admin1_id', role: 'admin' },
];
```

✅ Switch between `mockUsers[0]` (user) or `mockUsers[1]` (admin) inside `mockAuth` middleware.


## ⚡ How to Run Locally

Clone the project:

```bash
git clone https://github.com/your-username/event-management-api.git
```

Install dependencies:

```bash
npm install
```

Set up your MongoDB database connection.

Run the server:

```bash
npm run dev
```
