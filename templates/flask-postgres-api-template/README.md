# Flask PostgreSQL API Template

A production-ready Flask REST API template with PostgreSQL database, featuring user authentication, CRUD operations, and comprehensive error handling.

## Features

- Flask application factory pattern
- PostgreSQL database with SQLAlchemy ORM
- Flask-Migrate for database migrations
- RESTful API endpoints with proper error handling
- User authentication with password hashing
- CRUD operations for Users and Items
- Pagination support
- CORS enabled
- Docker setup for easy deployment
- Environment-based configuration
- Sample data seeding

## Tech Stack

- **Framework:** Flask 3.0
- **Database:** PostgreSQL 15
- **ORM:** SQLAlchemy
- **Migrations:** Flask-Migrate
- **CORS:** Flask-CORS
- **Containerization:** Docker & Docker Compose

## Project Structure

```
flask-postgres-api-template/
├── app/
│   ├── __init__.py          # Application factory
│   ├── api/                 # API blueprints
│   │   ├── __init__.py
│   │   ├── auth.py          # Authentication endpoints
│   │   ├── users.py         # User CRUD endpoints
│   │   └── items.py         # Item CRUD endpoints
│   └── models/              # Database models
│       ├── __init__.py
│       ├── base.py          # Base model with common fields
│       ├── user.py          # User model
│       └── item.py          # Item model
├── config/
│   ├── __init__.py
│   └── config.py            # Configuration classes
├── migrations/              # Database migrations (generated)
├── .env.example             # Environment variables template
├── .gitignore
├── docker-compose.yml       # Docker setup
├── Dockerfile
├── Makefile                 # Convenience commands
├── requirements.txt         # Python dependencies
├── run.py                   # Application entry point
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.11+
- PostgreSQL 15+
- Docker & Docker Compose (optional)

### Installation

#### Option 1: Local Setup

1. Clone the repository and navigate to the template directory:
```bash
cd flask-postgres-api-template
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Start PostgreSQL (make sure it's running on localhost:5432)

6. Initialize the database:
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

7. (Optional) Seed the database with sample data:
```bash
flask seed-db
```

8. Run the application:
```bash
flask run
```

The API will be available at `http://localhost:5000`

#### Option 2: Docker Setup

1. Copy environment variables:
```bash
cp .env.example .env
```

2. Start the containers:
```bash
docker-compose up -d
```

3. Initialize the database:
```bash
docker-compose exec app flask db init
docker-compose exec app flask db migrate -m "Initial migration"
docker-compose exec app flask db upgrade
```

4. (Optional) Seed the database:
```bash
docker-compose exec app flask seed-db
```

The API will be available at `http://localhost:5000`

### Using Makefile Commands

```bash
make help          # Show all available commands
make install       # Install dependencies
make run           # Run the application
make docker-up     # Start Docker containers
make docker-down   # Stop Docker containers
make migrate       # Run database migrations
make seed          # Seed database with sample data
make clean         # Remove cache files
```

## API Endpoints

### Health Check
- `GET /health` - Check API health status

### Authentication
- `POST /api/v1/auth/login` - Login with username/email and password
- `POST /api/v1/auth/register` - Register a new user account

### Users
- `GET /api/v1/users` - Get all users (paginated)
- `GET /api/v1/users/<id>` - Get a specific user
- `POST /api/v1/users` - Create a new user
- `PUT /api/v1/users/<id>` - Update a user
- `DELETE /api/v1/users/<id>` - Soft delete a user

### Items
- `GET /api/v1/items` - Get all items (paginated, filterable)
- `GET /api/v1/items/<id>` - Get a specific item
- `POST /api/v1/items` - Create a new item
- `PUT /api/v1/items/<id>` - Update an item
- `DELETE /api/v1/items/<id>` - Delete an item

## API Examples

### Register a new user
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepassword"
  }'
```

### Get all users with pagination
```bash
curl http://localhost:5000/api/v1/users?page=1&per_page=10
```

### Create an item
```bash
curl -X POST http://localhost:5000/api/v1/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "quantity": 5,
    "user_id": 1
  }'
```

### Get items with filters
```bash
curl "http://localhost:5000/api/v1/items?user_id=1&available=true&page=1"
```

## Database Models

### User
- `id` (Integer, Primary Key)
- `email` (String, Unique)
- `username` (String, Unique)
- `password_hash` (String)
- `first_name` (String)
- `last_name` (String)
- `is_active` (Boolean)
- `created_at` (DateTime)
- `updated_at` (DateTime)

### Item
- `id` (Integer, Primary Key)
- `name` (String)
- `description` (Text)
- `price` (Numeric)
- `quantity` (Integer)
- `is_available` (Boolean)
- `user_id` (Integer, Foreign Key)
- `created_at` (DateTime)
- `updated_at` (DateTime)

## Configuration

The application supports three environments:
- **development** - Debug mode enabled, verbose logging
- **production** - Optimized for production use
- **testing** - For running tests

Configure via the `FLASK_ENV` environment variable.

## Database Migrations

```bash
# Initialize migrations (first time only)
flask db init

# Create a new migration
flask db migrate -m "Description of changes"

# Apply migrations
flask db upgrade

# Rollback migrations
flask db downgrade
```

## Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app
```

## Development

### Flask Shell

Access the Flask shell with database context:
```bash
flask shell
```

Available in shell:
- `db` - Database instance
- `User` - User model
- `Item` - Item model

### Custom CLI Commands

```bash
flask init-db    # Initialize database
flask seed-db    # Seed with sample data
```

## Production Deployment

1. Set environment variables:
   - `FLASK_ENV=production`
   - `SECRET_KEY` - Strong secret key
   - `DATABASE_URL` - Production database URL

2. Use a production WSGI server (e.g., Gunicorn):
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

3. Set up a reverse proxy (Nginx) for HTTPS

4. Use environment variables for sensitive data

## Security Considerations

- Passwords are hashed using Werkzeug's security helpers
- CORS is enabled (configure allowed origins in production)
- SQL injection protection via SQLAlchemy
- Environment-based configuration for secrets
- Input validation on all endpoints

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues or questions, please open an issue on GitHub.
