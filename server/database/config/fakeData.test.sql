BEGIN;

    INSERT INTO "user" (first_name, last_name, email, password, avatar, business_type, website, organisation_name, address, city, country, zip_code, facebook, instagram, twitter, pending)
        VALUES ('Ahmed', 'Abdellatif', 'ahmedisam9922@gmail.com', '$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW', 'default-profile-pic.jpg', 'Charity', 'https://www.google.com', 'Ahmed Co.', 'Omar Al-Mukhtar St.', 'Gaza', 'Palestine', '79702', 'https://www.facebook.com', 'https://www.instagram.com', 'https://www.twitter.com', 'false'), 
               ('Amin', 'Al-Akhsam', 'aminking@gmail.com', '$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW', 'default-profile-pic.jpg', 'Community organisation', 'https://www.google.com', 'Amin Co.', 'Omar Al-Mukhtar St.', 'Gaza', 'Palestine', '79702', 'https://www.facebook.com', 'https://www.instagram.com', 'https://www.twitter.com', 'false'),
               ('Abdallah', 'Ammar', 'abdallah@gmail.com', '$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW', 'default-profile-pic.jpg', 'Education', 'https://www.google.com', 'Abd Co.', 'Omar Al-Mukhtar St.', 'Gaza', 'Palestine', '79702', 'https://www.facebook.com', 'https://www.instagram.com', 'https://www.twitter.com', 'false'),
               ('Israa', 'Sulaiman', 'israa@gmail.com', '$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW', 'default-profile-pic.jpg', 'Education', 'https://www.google.com', 'Abd Co.', 'Omar Al-Mukhtar St.', 'Gaza', 'Palestine', '79702', 'https://www.facebook.com', 'https://www.instagram.com', 'https://www.twitter.com', 'true'),
               ('Knaan', 'Hassuna', 'kh@gmail.com', '$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW', 'default-profile-pic.jpg', 'Education', 'https://www.google.com', 'Abd Co.', 'Omar Al-Mukhtar St.', 'Gaza', 'Palestine', '79702', 'https://www.facebook.com', 'https://www.instagram.com', 'https://www.twitter.com', 'true'),
               ('Ahmed', 'Isam', 'ahmedisam9922@hotmail.com', '$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW', 'default-profile-pic.jpg', 'Education', 'https://www.google.com', 'Abd Co.', 'Omar Al-Mukhtar St.', 'Gaza', 'Palestine', '79702', 'https://www.facebook.com', 'https://www.instagram.com', 'https://www.twitter.com', 'true');

  INSERT INTO public_service
    (primary_tag, description, image, focus_key, alt_text, meta, publisher_id, publish_datetime, title, is_draft)
  VALUES
    (2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '1_profile-pic.jpg', 'Lorem', 'ALT TEXT', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 3, '11/6/ 2019 - 04.30 p.m', 'News Title', false);

  INSERT INTO public_service_tag
    (secondary_tag, public_service_id)
  VALUES
    (1, 1),
    (2, 1),
    (3, 1);

  INSERT INTO event
    (title, description, category, event_start_datetime,event_end_datetime, venue, website, cost, image, focus_key, meta, alt_text, is_draft, publisher_id, publish_datetime)
  VALUES
    ('The main Event', ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', 1, '2019-06-24 10:01:16', '2019-06-24 10:01:19', 'Abed al Aziz Venue', 'www.geeks.com', '15', '2_profile-pic.jpg', 'Lorem', 'Lorem  Ipsum is simply dummy text of the printing  and typesetting industry.', 'alt text', false, 2, '11/4/2019 - 02.23 p.m'),
    ('The main Event', ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', 1, '2019-06-24 10:01:16', '2019-06-24 10:01:19', 'Abed al Aziz Venue', 'www.geeks.com', '15', '3_profile-pic.jpg', 'Lorem', 'Lorem  Ipsum is simply dummy text of the printing  and typesetting industry.', 'alt text', false, 2, '11/4/2019 - 02.23 p.m');

  INSERT INTO 
        event_topic
    (event_id, topic_id)
  VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (1, 4);

COMMIT;
