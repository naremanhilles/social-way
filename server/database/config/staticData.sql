BEGIN;

    INSERT INTO event_category (category) 
        VALUES ('Events and Festivals'),
               ('Nightlife'),
               ('Exhibitions'),
               ('Courses and workshops'),
               ('Walks and talks'); 

    INSERT INTO topic (topic) 
        VALUES ('Family and Children'),
               ('Food and drink'),
               ('Arts'),
               ('Heritage and Culture'),
               ('Sport and Hobbies'),
               ('Community Development');

    INSERT INTO primary_tag (tag) 
        VALUES ('Consultations'),
               ('Petitions'),
               ('Surveys'),
               ('Volunteering'),
               ('Research');

    INSERT INTO secondary_tag (tag) 
        VALUES ('Health'),
               ('Safety'),
               ('Planning'),
               ('Education');

INSERT INTO tip
        (tip_title, tip_description, post_type)
    VALUES
        ('image', 'the image size should be less than 500 M.B', 'publicService'),
        ('description', 'the description of the post should be short and comprehensive', 'publicService'),
        ('title', 'make the title as short as possible ', 'publicService'),
        ('image', 'the image size should be less than 500 M.B event', 'event'),
        ('description', 'the description of the post should be short and comprehensive event', 'event'),
        ('title', 'make the title as short as possible event', 'event');

COMMIT;
