# MASTER SLAVE DATABASE SYNCRONIZATION SCHEDULER SERVICE

<hr>

<div style="text-align: justify;">
    This is solution to create database replication of production database in anotheranother using cron/task scheduler with Nodejs service.
    The goal of this service is to replicate portions of data from production database into development database every (desired period of time, e.g 24 hour), so everytime that we develop new feature, we as developer will always get relevant data
    from development database, since the data from development database are exact copy of production data.
<div>
