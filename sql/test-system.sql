/*
Navicat PGSQL Data Transfer

Source Server         : test-system
Source Server Version : 90110
Source Host           : localhost:5432
Source Database       : test-system
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 90110
File Encoding         : 65001

Date: 2013-12-28 00:10:20
*/

-- ----------------------------
-- Table structure for answers
-- ----------------------------
DROP TABLE IF EXISTS "public"."answers";
CREATE TABLE "public"."answers" (
"id" SERIAL NOT NULL,
"question_id" int4,
"title" text COLLATE "default",
"points" int4,
"order" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of answers
-- ----------------------------
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('1', '1 ans', '-2', '0');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('1', '2 ans', '-1', '10');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('1', '3 ans', '0', '20');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('1', '4 ans', '1', '30');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('1', '5 ans', '2', '40');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('2', '1 ans', '-2', '0');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('2', '2 ans', '-1', '10');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('2', '3 ans', '0', '20');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('2', '4 ans', '1', '30');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('2', '5 ans', '2', '40');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('3', '1 ans', '0', '20');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('3', '2 ans', '1', '30');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('3', '3 ans', '2', '40');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('4', '1 ans', '0', '20');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('4', '2 ans', '1', '30');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('4', '3 ans', '2', '40');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('5', '1 ans', '1', '30');
INSERT INTO "public"."answers" ("question_id", "title", "points", "order") VALUES ('5', '2 ans', '2', '40');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."categories";
CREATE TABLE "public"."categories" (
"id" SERIAL NOT NULL,
"title" varchar(255) COLLATE "default",
"order" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO "public"."categories" ("title", "order") VALUES ('1 course', '0');
INSERT INTO "public"."categories" ("title", "order") VALUES ('2 course', '10');
INSERT INTO "public"."categories" ("title", "order") VALUES ('3 course', '20');
INSERT INTO "public"."categories" ("title", "order") VALUES ('4 course', '30');
INSERT INTO "public"."categories" ("title", "order") VALUES ('5 course', '40');

-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS "public"."questions";
CREATE TABLE "public"."questions" (
"id" SERIAL NOT NULL,
"test_id" int4,
"title" text COLLATE "default",
"type" text COLLATE "default",
"order" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of questions
-- ----------------------------
INSERT INTO "public"."questions" ("test_id", "title", "type", "order") VALUES ('1', '1 question', 'checkbox', '0');
INSERT INTO "public"."questions" ("test_id", "title", "type", "order") VALUES ('1', '2 question', 'radio', '10');
INSERT INTO "public"."questions" ("test_id", "title", "type", "order") VALUES ('1', '3 question', 'text', '20');
INSERT INTO "public"."questions" ("test_id", "title", "type", "order") VALUES ('1', '4 question', 'textarea', '30');
INSERT INTO "public"."questions" ("test_id", "title", "type", "order") VALUES ('1', '5 question', 'checkbox', '40');

-- ----------------------------
-- Table structure for results
-- ----------------------------
DROP TABLE IF EXISTS "public"."results";
CREATE TABLE "public"."results" (
"id" SERIAL NOT NULL,
"user_id" int4,
"test_id" int4,
"points" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of results
-- ----------------------------

-- ----------------------------
-- Table structure for rights
-- ----------------------------
DROP TABLE IF EXISTS "public"."rights";
CREATE TABLE "public"."rights" (
"id" SERIAL NOT NULL,
"title" varchar(255) COLLATE "default" DEFAULT NULL::character varying
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of rights
-- ----------------------------
INSERT INTO "public"."rights" ("title") VALUES ('adduser');
INSERT INTO "public"."rights" ("title") VALUES ('addtest');
INSERT INTO "public"."rights" ("title") VALUES ('addrights');
INSERT INTO "public"."rights" ("title") VALUES ('addanswers');
INSERT INTO "public"."rights" ("title") VALUES ('addquestions');
INSERT INTO "public"."rights" ("title") VALUES ('addcategories');
INSERT INTO "public"."rights" ("title") VALUES ('printresults');
INSERT INTO "public"."rights" ("title") VALUES ('testing');
INSERT INTO "public"."rights" ("title") VALUES ('edituser');
INSERT INTO "public"."rights" ("title") VALUES ('edittest');
INSERT INTO "public"."rights" ("title") VALUES ('editrights');
INSERT INTO "public"."rights" ("title") VALUES ('editanswers');
INSERT INTO "public"."rights" ("title") VALUES ('editquestions');
INSERT INTO "public"."rights" ("title") VALUES ('editcategories');
INSERT INTO "public"."rights" ("title") VALUES ('addsubjects');
INSERT INTO "public"."rights" ("title") VALUES ('editsubjects');

-- ----------------------------
-- Table structure for subcategories
-- ----------------------------
DROP TABLE IF EXISTS "public"."subcategories";
CREATE TABLE "public"."subcategories" (
"id" SERIAL NOT NULL,
"category_id" int4,
"title" varchar(255) COLLATE "default",
"order" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of subcategories
-- ----------------------------
INSERT INTO "public"."subcategories" ("category_id", "title", "order") VALUES ('1', 'Основи алгоритмізації', '0');
INSERT INTO "public"."subcategories" ("category_id", "title", "order") VALUES ('1', 'Лінійна алгебра', '10');
INSERT INTO "public"."subcategories" ("category_id", "title", "order") VALUES ('1', 'Групова динаміка', '20');

-- ----------------------------
-- Table structure for tests
-- ----------------------------
DROP TABLE IF EXISTS "public"."tests";
CREATE TABLE "public"."tests" (
"id" SERIAL NOT NULL,
"subcategory_id" int4 NOT NULL,
"title" varchar(255) COLLATE "default",
"description" varchar(255) COLLATE "default",
"start" timestamp(6),
"end" timestamp(6),
"order" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of tests
-- ----------------------------
INSERT INTO "public"."tests" ("subcategory_id", "title", "description", "order") VALUES ('1', 'Тема 1', 'Опис 1', '0');
INSERT INTO "public"."tests" ("subcategory_id", "title", "description", "order") VALUES ('1', 'Тема 2', 'Опис 2', '10');
INSERT INTO "public"."tests" ("subcategory_id", "title", "description", "order") VALUES ('1', 'Тема 3', 'Опис 3', '20');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
"id" SERIAL NOT NULL,
"login" varchar(255) COLLATE "default" NOT NULL,
"password" varchar(255) COLLATE "default" NOT NULL,
"name" varchar(255) COLLATE "default" DEFAULT NULL::character varying,
"surname" varchar(255) COLLATE "default" DEFAULT NULL::character varying,
"patronymic" varchar(255) COLLATE "default" DEFAULT NULL::character varying,
"rights" int2 DEFAULT 1 NOT NULL,
"email" varchar(255) COLLATE "default" DEFAULT NULL::character varying
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" ("login", "password", "name", "surname", "patronymic", "rights", "email") VALUES ('lekhmanrus', '7777777', 'Ruslan', 'Lekhman', 'Vitaliyevych', '0', 'lekhman-ruslan@i.ua');

-- ----------------------------
-- Table structure for users_rights
-- ----------------------------
DROP TABLE IF EXISTS "public"."users_rights";
CREATE TABLE "public"."users_rights" (
"id" SERIAL NOT NULL,
"right_id" int4 NOT NULL,
"user_rights" int4 NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of users_rights
-- ----------------------------
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('1', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('2', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('3', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('4', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('5', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('6', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('7', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('8', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('9', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('10', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('11', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('12', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('13', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('14', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('15', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('16', '0');
INSERT INTO "public"."users_rights" ("right_id", "user_rights") VALUES ('8', '1');

-- ----------------------------
-- Primary Key structure for table answers
-- ----------------------------
ALTER TABLE "public"."answers" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table questions
-- ----------------------------
ALTER TABLE "public"."questions" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table results
-- ----------------------------
ALTER TABLE "public"."results" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table rights
-- ----------------------------
ALTER TABLE "public"."rights" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table subcategories
-- ----------------------------
ALTER TABLE "public"."subcategories" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tests
-- ----------------------------
ALTER TABLE "public"."tests" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users_rights
-- ----------------------------
ALTER TABLE "public"."users_rights" ADD PRIMARY KEY ("id");
