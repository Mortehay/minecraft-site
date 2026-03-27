FROM supabase/postgres:15.14.1.102-pgctld-1_amd64

USER root

# Install openssl and create the keys
RUN apk add --no-cache openssl && \
    mkdir -p /etc/postgresql && \
    openssl req -new -x509 -days 365 -nodes -out /etc/postgresql/server.crt \
    -keyout /etc/postgresql/server.key -subj "/CN=127.0.0.1" && \
    chown postgres:postgres /etc/postgresql/server.crt /etc/postgresql/server.key && \
    chmod 600 /etc/postgresql/server.key

USER postgres