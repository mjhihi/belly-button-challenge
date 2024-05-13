### belly-button-challenge

In this project, a dashboard was created to explore the Belly Button Biodiversity dataset, which records microbes in human navels. The data shows a few microbial species are common in over 70% of people, while others are rare. 

#### Used the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

#### Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

- Used sample_values as the values for the bar chart.

- Used otu_ids as the labels for the bar chart.

- Used otu_labels as the hovertext for the chart.

#### Created a bubble chart that displays each sample.

- Used otu_ids for the x values.

- Used sample_values for the y values.

- Used sample_values for the marker size.

- Used otu_ids for the marker colors.

- Used otu_labels for the text values.

#### Displayed the sample's metadata, i.e., an individual's demographic information.

- Looped through each key-value pair from the metadata JSON object and create a text string.

- Appended an html tag with that text to the #sample-metadata panel.

#### Updated all the plots when a new sample is selected. 
