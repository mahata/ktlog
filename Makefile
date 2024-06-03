build:
	cd frontend && npm run build
	cd backend && ./gradlew build

t_frontend:
	cd frontend && npm test

t_backend:
	cd backend && ./gradlew clean test

t_all: t_frontend t_backend
