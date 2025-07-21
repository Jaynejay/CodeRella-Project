-- Sample data for courses
INSERT INTO courses (code, name, description) VALUES
('DTET', 'Diploma in Technical Education and Training', 'Comprehensive technical education program'),
('DICT', 'Diploma in Information and Communication Technology', 'Modern ICT education program'),
('DAM', 'Diploma in Agriculture Management', 'Agricultural management and technology program');

-- Sample data for subjects
INSERT INTO subjects (code, name, description, course_id) VALUES
('SUB_01', 'Technical Drawing', 'Fundamentals of technical drawing and design', 1),
('SUB_02', 'Engineering Mathematics', 'Advanced mathematics for engineering applications', 1),
('SUB_03', 'Computer Programming', 'Introduction to programming concepts', 2),
('SUB_04', 'Database Management', 'Database design and management systems', 2),
('SUB_05', 'Agricultural Production', 'Modern agricultural production techniques', 3),
('SUB_06', 'Plant Protection', 'Plant health and protection methods', 3);

-- Sample data for paper setters
INSERT INTO paper_setters (registration_id, name, email, phone, created_at, updated_at) VALUES
('DTET_PS5431', 'Wimalasekera I.S.', 'wimalasekera@example.com', '+94-71-123-4567', NOW(), NOW()),
('DTET_PS7721', 'Amarathunga A.T.', 'amarathunga@example.com', '+94-71-234-5678', NOW(), NOW()),
('DTET_PS4788', 'Jayaprabha P.H.J.', 'jayaprabha@example.com', '+94-71-345-6789', NOW(), NOW()),
('DTET_PS229', 'Amarasiri K.J.M.', 'amarasiri@example.com', '+94-71-456-7890', NOW(), NOW()),
('DTET_PS5296', 'Lokupathirage I.M.', 'lokupathirage@example.com', '+94-71-567-8901', NOW(), NOW()),
('DTET_PS2311', 'Wijerathna S.M.', 'wijerathna@example.com', '+94-71-678-9012', NOW(), NOW()),
('DTET_PS5111', 'Jayathilake P.P.P.', 'jayathilake@example.com', '+94-71-789-0123', NOW(), NOW()),
('DTET_PS8957', 'Abesekara I.M.', 'abesekara@example.com', '+94-71-890-1234', NOW(), NOW()); 