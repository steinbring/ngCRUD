ngCRUD: An AngularJS-based CRUD Boilerplate
======

##What?

This is meant to be a highly reusable, efficient CRUD (Create, Update, Delete) example application.  The core functionality is written in JavaScript, using AngularJS.  My goal was to only use server-side technologies for interaction with the database.

There is currently one version of the updater (a sortable, searchable, pagable grid with 'new', 'edit', 'delete' buttons).  My intention is to add more versions over time.  There is definitely more than one way to write a CRUD app.

###Features

- The table is sortable (by clicking on any column header
- Paging is baked in
- There is a search box that searches all attributes and updates the results dynamically

###TODO

*Short-term goals*:

- Build out display of robust messages (from the server) when you delete a record
- Build out client/server interactions for editing of a record
- Build out client/server interactions for creation of a new record

*Long-term goals*:

- It reads the records from the server when you load the app but doesn't reread them at any point.  This means that if there are two simultaneous users, the second user's changes won't be reflected at any point.  There should be a method for pushing other people's changes to the interface.
- There is only one version right now.  I want to create at more.
	1. A grid layout where the cells become editable when you click on them
	2. A grid layout with a slide-out "create new"/"update" area (so that you can see the other items on the screen, while making your change)

###Acknoledgments

I leveraged a few projects in this:

- [Angular Modal](https://github.com/btford/angular-modal)
- [Sweet Alert](http://tristanedwards.me/sweetalert)

##Why?

I have been trying to step up my [AngularJS](https://angularjs.org/) skills for a while, now.  I have posted a number of [blog posts](http://steinbring.net) about it but I had never done anything truly substantive.  If nothing else, this is a great testbed for Angular concepts and techniques.
