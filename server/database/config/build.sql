BEGIN;

    DROP TABLE IF EXISTS "user", event, public_service_tag, topic, event_topic, event_category,
    primary_tag, secondary_tag, public_service, tip CASCADE;

    CREATE TABLE "user" (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        business_type TEXT NOT NULL,
        website TEXT NOT NULL,
        organisation_name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        country TEXT NOT NULL,
        zip_code TEXT NOT NULL,
        facebook TEXT,
        instagram TEXT,
        twitter TEXT,
        avatar TEXT,
        pending BOOLEAN NOT NULL
    );

    CREATE TABLE event_category (
        id SERIAL PRIMARY KEY,
        category TEXT NOT NULL
    );

    CREATE TABLE primary_tag (
        id SERIAL PRIMARY KEY,
        tag TEXT NOT NULL
    );

    CREATE TABLE secondary_tag(
        id SERIAL PRIMARY KEY,
        tag TEXT NOT NULL
    );

    CREATE TABLE public_service (
        id SERIAL PRIMARY KEY,
        primary_tag INTEGER REFERENCES primary_tag(id) on DELETE CASCADE,
        description TEXT NOT NULL,
        image TEXT,
        focus_key TEXT NOT NULL,
        alt_text TEXT NOT NULL,
        meta TEXT NOT NULL,
        publisher_id INTEGER REFERENCES "user"(id) on DELETE CASCADE,
        publish_datetime TEXT,
        title TEXT NOT NULL,
        is_draft BOOLEAN NOT NULL
    );
    
    CREATE TABLE public_service_tag (
        secondary_tag INTEGER REFERENCES secondary_tag(id) on DELETE CASCADE,
        public_service_id INTEGER REFERENCES public_service(id) on DELETE CASCADE
    );
    

    CREATE TABLE event (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category INTEGER REFERENCES event_category(id),
        event_start_datetime TEXT NOT NULL,
        event_end_datetime TEXT NOT NULL,
        venue TEXT NOT NULL,
        website TEXT NOT NULL,
        cost TEXT NOT NULL,
        image TEXT NOT NULL,
        focus_key TEXT NOT NULL,
        meta TEXT NOT NULL,
        alt_text TEXT NOT NULL,
        is_draft BOOLEAN NOT NULL,
        publisher_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
        publish_datetime TEXT NOT NULL
    );


    CREATE TABLE topic (
        id SERIAL PRIMARY KEY,
        topic TEXT NOT NULL
    );

    CREATE TABLE event_topic (
        event_id INTEGER REFERENCES event(id) ON DELETE CASCADE,
        topic_id INTEGER REFERENCES topic(id) on DELETE CASCADE
    );
    
    CREATE TABLE tip (
        id SERIAL PRIMARY KEY,
        tip_title TEXT NOT NULL,
        tip_description TEXT NOT NULL,
        post_type TEXT NOT NULL
    );

COMMIT;
