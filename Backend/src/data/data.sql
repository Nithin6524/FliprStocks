CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    name TEXT,
    symbol TEXT,
    price NUMERIC,
    date DATE,
    open NUMERIC,
    high NUMERIC,
    low NUMERIC,
    close NUMERIC,
    volume BIGINT
);
