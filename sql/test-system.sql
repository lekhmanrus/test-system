/*
Navicat PGSQL Data Transfer

Source Server         : test-system
Source Server Version : 90111
Source Host           : localhost:5432
Source Database       : test-system
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 90111
File Encoding         : 65001

Date: 2013-12-27 21:55:26
*/


-- ----------------------------
-- Sequence structure for answers_id_seq
-- ----------------------------
DROP SEQUENCE "public"."answers_id_seq";
CREATE SEQUENCE "public"."answers_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for categories_id_seq
-- ----------------------------
DROP SEQUENCE "public"."categories_id_seq";
CREATE SEQUENCE "public"."categories_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for questions_id_seq
-- ----------------------------
DROP SEQUENCE "public"."questions_id_seq";
CREATE SEQUENCE "public"."questions_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for results_id_seq
-- ----------------------------
DROP SEQUENCE "public"."results_id_seq";
CREATE SEQUENCE "public"."results_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for rights_id_seq
-- ----------------------------
DROP SEQUENCE "public"."rights_id_seq";
CREATE SEQUENCE "public"."rights_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;
SELECT setval('"public"."rights_id_seq"', 1, true);

-- ----------------------------
-- Sequence structure for subjects_id_seq
-- ----------------------------
DROP SEQUENCE "public"."subjects_id_seq";
CREATE SEQUENCE "public"."subjects_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for tests_id_seq
-- ----------------------------
DROP SEQUENCE "public"."tests_id_seq";
CREATE SEQUENCE "public"."tests_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 4
 CACHE 1;
SELECT setval('"public"."users_id_seq"', 4, true);

-- ----------------------------
-- Sequence structure for users_rights_id_seq
-- ----------------------------
DROP SEQUENCE "public"."users_rights_id_seq";
CREATE SEQUENCE "public"."users_rights_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

-- ----------------------------
-- Table structure for answers
-- ----------------------------
DROP TABLE IF EXISTS "public"."answers";
CREATE TABLE "public"."answers" (
"id" int4 DEFAULT nextval('answers_id_seq'::regclass) NOT NULL,
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

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."categories";
CREATE TABLE "public"."categories" (
"id" int4 DEFAULT nextval('categories_id_seq'::regclass) NOT NULL,
"title" varchar(255) COLLATE "default",
"order" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO "public"."categories" VALUES ('1', '1 course', '0');
INSERT INTO "public"."categories" VALUES ('2', '2 course', '10');
INSERT INTO "public"."categories" VALUES ('3', '3 course', '20');
INSERT INTO "public"."categories" VALUES ('4', '4 course', '30');
INSERT INTO "public"."categories" VALUES ('5', '5 course', '40');

-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS "public"."questions";
CREATE TABLE "public"."questions" (
"id" int4 DEFAULT nextval('questions_id_seq'::regclass) NOT NULL,
"test_id" int4,
"title" text COLLATE "default",
"order" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of questions
-- ----------------------------

-- ----------------------------
-- Table structure for results
-- ----------------------------
DROP TABLE IF EXISTS "public"."results";
CREATE TABLE "public"."results" (
"id" int4 DEFAULT nextval('results_id_seq'::regclass) NOT NULL,
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
"id" int4 DEFAULT nextval('rights_id_seq'::regclass) NOT NULL,
"title" varchar(255) COLLATE "default" DEFAULT NULL::character varying
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of rights
-- ----------------------------
INSERT INTO "public"."rights" VALUES ('1', 'adduser');
INSERT INTO "public"."rights" VALUES ('2', 'addtest');
INSERT INTO "public"."rights" VALUES ('3', 'addrights');
INSERT INTO "public"."rights" VALUES ('4', 'addanswers');
INSERT INTO "public"."rights" VALUES ('5', 'addquestions');
INSERT INTO "public"."rights" VALUES ('6', 'addcategories');
INSERT INTO "public"."rights" VALUES ('7', 'printresults');
INSERT INTO "public"."rights" VALUES ('8', 'testing');
INSERT INTO "public"."rights" VALUES ('9', 'edituser');
INSERT INTO "public"."rights" VALUES ('10', 'edittest');
INSERT INTO "public"."rights" VALUES ('11', 'editrights');
INSERT INTO "public"."rights" VALUES ('12', 'editanswers');
INSERT INTO "public"."rights" VALUES ('13', 'editquestions');
INSERT INTO "public"."rights" VALUES ('14', 'editcategories');
INSERT INTO "public"."rights" VALUES ('15', 'addsubjects');
INSERT INTO "public"."rights" VALUES ('16', 'editsubjects');

-- ----------------------------
-- Table structure for subjects
-- ----------------------------
DROP TABLE IF EXISTS "public"."subjects";
CREATE TABLE "public"."subjects" (
"id" int4 DEFAULT nextval('subjects_id_seq'::regclass) NOT NULL,
"category_id" int4,
"title" varchar(255) COLLATE "default",
"order" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of subjects
-- ----------------------------

-- ----------------------------
-- Table structure for tests
-- ----------------------------
DROP TABLE IF EXISTS "public"."tests";
CREATE TABLE "public"."tests" (
"id" int4 DEFAULT nextval('tests_id_seq'::regclass) NOT NULL,
"subject_id" int4 NOT NULL,
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

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
"id" int4 DEFAULT nextval('users_id_seq'::regclass) NOT NULL,
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
INSERT INTO "public"."users" VALUES ('1', 'lekhmanrus', '7777777', 'Ruslan', 'Lekhman', 'Vitaliyevych', '0', 'lekhman-ruslan@i.ua');
INSERT INTO "public"."users" VALUES ('2', 'test__', '7777777', 'TEST_N', 'TEST_S', 'TEST_P', '1', 'undefined');
INSERT INTO "public"."users" VALUES ('3', '1111111', '11111111', '111', '1111', '111', '1', 'undefined');

-- ----------------------------
-- Table structure for users_rights
-- ----------------------------
DROP TABLE IF EXISTS "public"."users_rights";
CREATE TABLE "public"."users_rights" (
"id" int4 DEFAULT nextval('users_rights_id_seq'::regclass) NOT NULL,
"right_id" int4 NOT NULL,
"user_rights" int4 NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of users_rights
-- ----------------------------
INSERT INTO "public"."users_rights" VALUES ('1', '1', '0');
INSERT INTO "public"."users_rights" VALUES ('2', '2', '0');
INSERT INTO "public"."users_rights" VALUES ('3', '3', '0');
INSERT INTO "public"."users_rights" VALUES ('4', '4', '0');
INSERT INTO "public"."users_rights" VALUES ('5', '5', '0');
INSERT INTO "public"."users_rights" VALUES ('6', '6', '0');
INSERT INTO "public"."users_rights" VALUES ('7', '7', '0');
INSERT INTO "public"."users_rights" VALUES ('8', '8', '0');
INSERT INTO "public"."users_rights" VALUES ('9', '9', '0');
INSERT INTO "public"."users_rights" VALUES ('10', '10', '0');
INSERT INTO "public"."users_rights" VALUES ('11', '11', '0');
INSERT INTO "public"."users_rights" VALUES ('12', '12', '0');
INSERT INTO "public"."users_rights" VALUES ('13', '13', '0');
INSERT INTO "public"."users_rights" VALUES ('14', '14', '0');
INSERT INTO "public"."users_rights" VALUES ('15', '15', '0');
INSERT INTO "public"."users_rights" VALUES ('16', '16', '0');
INSERT INTO "public"."users_rights" VALUES ('17', '8', '1');

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------
ALTER SEQUENCE "public"."answers_id_seq" OWNED BY "answers"."id";
ALTER SEQUENCE "public"."categories_id_seq" OWNED BY "categories"."id";
ALTER SEQUENCE "public"."questions_id_seq" OWNED BY "questions"."id";
ALTER SEQUENCE "public"."results_id_seq" OWNED BY "results"."id";
ALTER SEQUENCE "public"."rights_id_seq" OWNED BY "rights"."id";
ALTER SEQUENCE "public"."subjects_id_seq" OWNED BY "subjects"."id";
ALTER SEQUENCE "public"."tests_id_seq" OWNED BY "tests"."id";
ALTER SEQUENCE "public"."users_id_seq" OWNED BY "users"."id";
ALTER SEQUENCE "public"."users_rights_id_seq" OWNED BY "users_rights"."id";

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
-- Primary Key structure for table subjects
-- ----------------------------
ALTER TABLE "public"."subjects" ADD PRIMARY KEY ("id");

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
