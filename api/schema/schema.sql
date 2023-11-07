IF TABLE DOES NOT EXIST "Taplist Integration"."auth_info" THEN
    CREATE TABLE "Taplist Integration"."auth_info" (
        "id" SERIAL PRIMARY KEY,
        "venue" VARCHAR(255) NOT NULL,
        "auth_token" VARCHAR(255) NOT NULL,
    );
END IF;
```