.PHONY: help install run test clean docker-up docker-down migrate seed

help:
	@echo "Available commands:"
	@echo "  make install      - Install dependencies"
	@echo "  make run          - Run the Flask application"
	@echo "  make test         - Run tests"
	@echo "  make clean        - Remove cache and build files"
	@echo "  make docker-up    - Start Docker containers"
	@echo "  make docker-down  - Stop Docker containers"
	@echo "  make migrate      - Run database migrations"
	@echo "  make seed         - Seed database with sample data"

install:
	pip install -r requirements.txt

run:
	flask run

test:
	pytest

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +
	rm -rf .pytest_cache
	rm -rf htmlcov
	rm -rf .coverage

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

migrate:
	flask db upgrade

seed:
	flask seed-db

init-db:
	flask db init
	flask db migrate -m "Initial migration"
	flask db upgrade
