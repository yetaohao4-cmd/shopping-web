# PostgreSQL

Run the local database:

```powershell
docker compose -f docker-compose.postgres.yml up -d
```

Connection settings:

- Host: `localhost`
- Port: `5432`
- Database: `shopping`
- User: `shopping_user`
- Password: `shopping_password`
- URL: `postgresql://shopping_user:shopping_password@localhost:5432/shopping`

The initialization SQL in `docker/postgres/init` runs only when the Docker volume is first created.
