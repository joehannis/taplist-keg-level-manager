IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'auth_info' AND table_schema = 'Taplist Integration') THEN 
        CREATE TABLE "Taplist Integration"."auth_info" (
            "id" SERIAL PRIMARY KEY,
            "venue" VARCHAR(255) NOT NULL,
            "auth_token" VARCHAR(255) NOT NULL
        );
    END IF;
```