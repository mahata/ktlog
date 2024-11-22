build:
	cd frontend && npm run build
	cd backend && ./gradlew build

t_fe:
	cd frontend && npm run lint && npm test && npm run build

t_be:
	cd backend && ./gradlew clean test build

l_fe:
	cd frontend && npm run lint-fix

l_be:
	cd backend && ./gradlew ktlintFormat

t: t_all
t_all: t_fe t_be

l: l_all
l_all: l_fe l_be
