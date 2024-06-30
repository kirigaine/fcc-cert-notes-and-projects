#!/bin/bash

cd ~/Documents/programming/fcc-cert-notes-and-projects/responsiveWebDesign/


# Iterate through files with only 1 number and append 0 to front

for file in ?-*; do
	file_name=${file}
	# echo "0$file_name"
	mv "$file_name" "0$file_name"
	echo "renamed '$file_name' to '0$file_name'" 
done
