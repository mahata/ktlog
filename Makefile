build:
	cd frontend && npm run build
	cd backend && ./gradlew build

t_frontend:
	cd frontend && npm test && npm run build

t_backend:
	cd backend && ./gradlew clean test build

l_frontend:
	cd frontend && npm run lint-fix

l_backend:
	cd backend && ./gradlew ktlintFormat


t: t_all
t_all: t_frontend t_backend

l: l_all
l_all: l_frontend l_backend
