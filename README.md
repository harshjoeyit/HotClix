# HotClix
A photo management application 

### Video [Link](https://drive.google.com/file/d/1IxxzfNAHcKNOXmggPge81jdmAg-g6r-A/view?usp=sharing)

### Tech Stack 
- Backend - NodeJs
- Frontend - ReactJs
- Database - MySQL
- Blob Storage - AWS S3

### Features 
- Photo management application
- User authentication using JWT
- Create and delete galleries
- Upload photos to galleries
    - Click to upload
    - Drag and drop to upload
- View photos and galleries of other user
- Download photos
- Mobile responsive

### How to run locally?
- Clone the repository
- Create a S3 bucket on AWS and with right ACL policies
- Start MySQL server and create a database by `snaphot` and import the `snaphot.sql` to create the tables
- Create a file named `.env` and copy the fields from `env_sample` to `.env` and populate the fields
- Run `npm i` in `HotClix` and `HotClix/client` directory. You can safely ignore the warning if it comes up.
- 
 