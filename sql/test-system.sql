/*
Navicat PGSQL Data Transfer

Source Server         : 1
Source Server Version : 90110
Source Host           : localhost:5432
Source Database       : test-system
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 90110
File Encoding         : 65001

Date: 2013-12-10 23:54:32
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
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS "public"."questions";
CREATE TABLE "public"."questions" (
"id" SERIAL NOT NULL,
"test_id" int4,
"title" text COLLATE "default",
"order" int4
)
WITH (OIDS=FALSE)

;

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
-- Table structure for subjects
-- ----------------------------
DROP TABLE IF EXISTS "public"."subjects";
CREATE TABLE "public"."subjects" (
"id" SERIAL NOT NULL,
"category_id" int4,
"title" varchar(255) COLLATE "default",
"order" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for tests
-- ----------------------------
DROP TABLE IF EXISTS "public"."tests";
CREATE TABLE "public"."tests" (
"id" SERIAL NOT NULL,
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
-- Alter Sequences Owned By 
-- ----------------------------

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
