-- CREATE DATABASE mystudent;

-- USE mystudent;

-- CREATE TABLE teacher(id INT(2) PRIMARY KEY AUTO_INCREMENT,sname VARCHAR(20),pwd INT(16),admin_order VARCHAR(2000),admin_icon VARCHAR(2000),admin_content VARCHAR(2000))CHARSET utf8

-- INSERT INTO teacher VALUES(NULL,'admin',123456,'/student,/kecheng,/kebiao,/chengji','user,menu,s-order,s-data','学生管理,课程管理,课表查询,成绩管理')

-- CREATE TABLE student (id INT(3) PRIMARY KEY AUTO_INCREMENT, sname VARCHAR(20),pwd INT(16),stu_sex VARCHAR(10),stu_age INT(3),stu_birth VARCHAR(100),stu_attd VARCHAR(1000),stu_yx VARCHAR(1000),stu_zy VARCHAR(1000),stu_bj VARCHAR(1000),stu_order VARCHAR(2000),stu_icon VARCHAR(2000),stu_content VARCHAR(2000))CHARSET utf8

-- INSERT INTO student VALUES(NULL,'张三','123456','1',18,'2004-01-05','广东省xxxx市xxxx镇xxxx村','信息工程学院','软件技术','软件技术2班','/kebiao,/chengji','s-order,s-data','课表查询,成绩管理'),(NULL,'李四','123456','1',18,'2004-01-05','广东省xxxx市xxxx镇xxxx村','信息工程学院','软件技术','软件技术2班','/kebiao,/chengji','s-order,s-data','课表查询,成绩查询'),(NULL,'王五','123456','1',18,'2004-01-05','广东省xxxx市xxxx镇xxxx村','信息工程学院','软件技术','软件技术2班','/kebiao,/chengji','s-order,s-data','课表查询,成绩查询'),(NULL,'赵六','123456','1',18,'2004-01-05','广东省xxxx市xxxx镇xxxx村','信息工程学院','软件技术','软件技术2班','/kebiao,/chengji','s-order,s-data','课表查询,成绩查询'),(NULL,'小红','123456','1',18,'2004-01-05','广东省xxxx市xxxx镇xxxx村','信息工程学院','软件技术','软件技术2班','/kebiao,/chengji','s-order,s-data','课表查询,成绩查询'),(NULL,'小花','123456','1',18,'2004-01-05','广东省xxxx市xxxx镇xxxx村','信息工程学院','软件技术','软件技术2班','/kebiao,/chengji','s-order,s-data','课表查询,成绩查询')

-- CREATE TABLE kecheng (id INT(3) PRIMARY KEY AUTO_INCREMENT,zyDate VARCHAR(200),kcDate VARCHAR(200),lsDate VARCHAR(200),attdDate VARCHAR(200),xingDate VARCHAR(200),jieDate VARCHAR(200))CHARSET utf8

-- insert into kecheng values(null,'软件技术','php','小红','1栋113','1','1'),(null,'软件技术','c语言','小花','1栋115','2','2'),(null,'软件技术','python','小张','1栋123','3','3'),(null,'软件技术','java','小华','1栋101','4','4'),(null,'软件技术','javascript','小张','1栋106','5','5'),(null,'软件技术','javaweb','小红','1栋115','2','1'),(null,'计算机应用与技术','php','小红','1栋113','1','1'),(null,'计算机应用与技术','c语言','小花','1栋115','2','2'),(null,'计算机应用与技术','python','小张','1栋123','3','3'),(null,'计算机应用与技术','java','小华','1栋101','4','4'),(null,'计算机应用与技术','javascript','小张','1栋106','5','5'),(null,'计算机应用与技术','javaweb','小红','1栋115','3','1'),(null,'大数据应用与技术','php','小红','1栋113','1','1'),(null,'大数据应用与技术','c语言','小花','1栋115','2','2'),(null,'大数据应用与技术','python','小张','1栋123','3','3'),(null,'大数据应用与技术','java','小华','1栋101','4','4'),(null,'大数据应用与技术','javascript','小张','1栋106','5','5'),(null,'大数据应用与技术','javaweb','小红','1栋115','4','1'),(null,'电子商务与技术','php','小红','1栋113','1','1'),(null,'电子商务与技术','c语言','小花','1栋115','2','2'),(null,'电子商务与技术','python','小张','1栋123','3','3'),(null,'电子商务与技术','java','小华','1栋101','4','4'),(null,'电子商务与技术','javascript','小张','1栋106','5','5'),(null,'电子商务与技术','javaweb','小红','1栋115','1','5')

-- CREATE TABLE chengji (id INT(3) PRIMARY KEY AUTO_INCREMENT,cname VARCHAR(200),scDatep VARCHAR(200),scDatec VARCHAR(200),scDatepy VARCHAR(200),scDatej VARCHAR(200),scDatejs VARCHAR(200),scDatew VARCHAR(200))CHARSET utf8
 
-- insert into chengji values(null,'1','65','50','60','69','60','30'),(NULL,'2','62','60','30','60','90','60'),(NULL,'3','60','20','67','60','80','20'),(NULL,'4','40','66','66','60','67','68'),(NULL,'5','60','64','69','60','66','90'),(NULL,'6','60','63','80','60','65','90')
 
-- SELECT * FROM kecheng