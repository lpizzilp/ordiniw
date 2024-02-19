#!/bin/bash

#Riprendi i parametri 
#Lancia la procedura con noode.js

source /home/qedpqgpb/nodevenv/ordini_web/Script/16/bin/activate 
cd /home/qedpqgpb/ordini_web/Script 
node ApertureSrp $1 $2 $3 
