/* Generates all tables and inserts generic information into them */

/* Table structure for table `locations` */
CREATE DATABASE IF NOT EXISTS location_info;
USE location_info;
DROP TABLE IF EXISTS `images`;
DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(8000) NOT NULL DEFAULT 'No description provided.',
  `transcript` varchar(8000) NOT NULL DEFAULT 'No transcript provided.',
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `filters` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `site_id` int(10) unsigned DEFAULT NULL,
  `index` int(10) unsigned DEFAULT NULL,
  `caption` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `site_id_fk_idx` (`site_id`),
  CONSTRAINT `site_id_fk` FOREIGN KEY (`site_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* Table structure for table `users` */
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `email` varchar(45) NOT NULL,
  `password` char(60) NOT NULL,
  `usertype` enum('admin','superadmin') NOT NULL DEFAULT 'admin',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='users for login\n';


-- -----------------------------------------------------
-- Schema location_info
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `location_info` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `location_info` ;

-- -----------------------------------------------------
-- Table `location_info`.`filters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `filters`;
CREATE TABLE `location_info`.`filters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `filter` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
--
-- Data for table `locations`
--
/* Table structure for table `osc_info` */
DROP TABLE IF EXISTS `ocs_info`;
CREATE TABLE `ocs_info` (
  `information` varchar(8000) NOT NULL DEFAULT 'No information provided.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- this looks terrible but multiple line strings will include any indentation so indents have been suppressed
-- at least it's not 4000 characters in one line
/* Data for table `locations` */
LOCK TABLES `locations` WRITE;
INSERT INTO `locations` VALUES 
(1,'Tech Green',
'- Tech Green was built to support the sustainable design of the Clough Undergraduate Learning Commons (CULC) building.\n
- Buried underneath Tech Green is 1.4-million-gallon cistern system.\n
- The cistern system is one of the largest of its kind in the U.S.\n
- The cistern captures rainwater runoff and condensate from mechanical systems at Clough Commons and nearby buildings.\n
- Reclaimed water is used for toilet flushing and water efficient landscaping.',
'Tech Green was built to support the sustainable design of the Clough Undergraduate Learning Commons Building. The green space is located directly across from the Clough Undergraduate Learning Commons and is surrounded by the four sidewalks that compose Tech Walkway.\n\n
Tech Green is a nod to sustainable practices and demonstrates Georgia Tech\'s commitment to responsible water usage. The surface of Tech green uses turf tuff grass called zoysia, which helps maintain sustainable irrigation and sewage during rainy seasons. Buried underneath the lawn is a 1.4-million-gallon cistern system.\n\n
By capturing rainwater runoff, the cistern system substantially reduces the amount of stormwater Georgia Tech feeds into the city\'s stormwater sewer system. In addition to collecting runoff from Tech Green, the system captures condensate from the mechanical system at Clough Commons and nearby Buildings.\n\n
Much of the water captured in the reservoir system is sent to Clough Commons for treatment. The treatment system uses ultraviolet lighting and a variety of filtering mechanisms to eliminate microorganisms. Once treated, the nonpotable water can then be reused. Clough Commons uses the reclaimed water for toilet flushing and water-efficient landscaping. The cistern system is the largest of its kind in the U.S. and holds enough water to supply irrigation and toilet water for clough commons and the surrounding landscaped area for up to 28 days without rain.\n\n',
33.7746,-84.3973,
NULL),
                                   
(2,'Clough Undergraduate Learning Commons',
'- The G. Wayne Clough Undergraduate Learning Commons opened its doors to the Georgia Tech community on August 20, 2011.\n
- The building serves as an interdisciplinary facility to encourage collaboration and technologically enhanced teaching and learning.\n
- Building has an 18,000-square-foot rooftop garden with native plants that help preserve the natural ecosystem.\n
- Building uses cistern to captures runoff water for flushing toilets and irrigating the landscape.\n
- The building’s rooftop has a solar panel system with 360 solar panels and 30 solar hot water collectors.\n',
'The G. Wayne Clough Undergraduate Learning Commons, also referred to as Clough Commons, opened its doors to the Georgia Tech community on August 20, 2011. The five-story academic building houses classrooms, science laboratories, academic services, commons areas, and is managed by and connected to the Georgia Tech Library. The building serves as an interdisciplinary facility to encourage collaboration and technologically enhanced teaching and learning.\n\n
The Clough Undergraduate Learning Commons was built with sustainability in mind and is a LEED Platinum academic building on Georgia Techs campus. The building contains various sustainability features, which demonstrates Georgia Tech\'s commitment to sustainable design.\n\n
The building’s rooftop has a solar panel system with 360 solar panels and 30 solar hot water collectors. The photovoltaic system is expected to generate approximately 120,000 kilowatt-hours of electricity per year, offsetting over 80 tons of carbon dioxide annually and should heat about 50 percent of the building\'s hot water. The building also uses smart lighting techniques such as daylight harvesting and motion sensors to control the overall electrical usage of the building.\n\n
The Clough Commons project also incorporated green space into its design with an 18,000-square-foot rooftop garden with native plants that help preserve the natural ecosystem.\n\n
The project also included water efficiency techniques such as installing a 1.4 million gallon cistern. The cistern captures runoff water for flushing toilets and irrigating the landscape. The cistern system is buried below Tech Green next to the center.\n\n',
33.7746,-84.3964,
NULL),

(3,'Student Community Garden (Georgia Tech Community Garden)',
'- Garden was initiated by Students Organizing for Sustainability (S.O.S) in 2012.\n
- Teaches students about sustainable food systems.\n
- All produce is grown without the use of chemical fertilizers.\n',
'The Georgia Tech Community Garden was initiated by Students Organizing for Sustainability (S.O.S) in 2012. The student group secured the space from the administration and won a grant from the Student Government Association to build 6 garden beds and purchase seeds. \n\n
The Georgia Tech Community Garden is located on the southeast side of the Instructional Center lawn and is a resource available to everyone on campus. The garden supplies a variety of produce all grown without the use of chemical fertilizers. Current crops include beets, broccoli, cabbage, carrots, garlic, green onions, kohlrabi, leeks, lettuce, onions, peas, radishes, spinach, sweet peas, sweet potatoes, swiss chard and turnips.\n\n
The project was established to bring awareness to sustainable food systems and urban agriculture. The community garden serves as a call to action for students, faculty and administrators to become involved in growing their own food, while also having a positive impact on their community and environment.\n\n',
33.7751,-84.4004,
NULL),

(4,'The Kendeda Building for Innovative Sustainable Design',
'- The Kendeda Building for Innovative Sustainable Design was established with a gift of $30 million to Georgia Tech from The Kendeda Fund.\n
- The Kendeda Building demonstrates Georgia Tech’s vision to create a sustainable campus and teach future generations about how innovative solutions contribute to a better world.\n
- The building’s program and occupants represent a hub of sustainability activities on Georgia Tech’s campus. \n
- The building is a demonstration of regenerative design principles in its design, construction, and operational performance. \n
- The building is currently on track to achieve Living Building Challenge certification, the most robust sustainable building recognition in the world.\n',
'OVERVIEW\n
­­­­­­The Kendeda Building for Innovative Sustainable Design was established with a $30 million grant to Georgia Tech from The Kendeda Fund and it opened in October 2019. \n\n
As a sustainable model and hub, The Kendeda Building serves as a living-learning laboratory and demonstrates innovative solutions for complex problems to the next generation of learners. The building houses classrooms, teaching labs, offices, and a makerspace which will allow students, staff, and faculty to explore sustainability ideas in action. \n\n
The Kendeda Building is pursuing the Living Building Challenge certification, the most sustainable building certification criteria that exists. The Living Building Challenge is grounded in the idea that buildings should give back to the planet more than they take, thus creating a positive impact on humans and the environment.\n\n
SUSTAINABLE SITE\n
Recommended site locations: Rooftop garden\n\n
The project\'s design and performance is grounded in its sustainable location and site characteristics. The building sits on an urban previously developed site with access to public transportation and safe ways to bike or walk to campus. There is no parking on site to encourage sustainable commuting and to optimize the land use for productive purposes.\n\n
The building grows food onsite as a way to care for and replenish nutrients in the soil. Foods such as blueberries, corn, muscadine grapes, and summer squash are grown without chemicals on the rooftop garden or mixed in with the surrounding landscape.\n\n
ENERGY\n
Recommended site locations: outdoor solar panel shades, 1st floor atrium.\n\n
The Kendeda Building has a unique net-positive energy performance approach that allows the building to capture more energy than it consumes in a year. Strategies the building uses to reduce the total energy load of the building include:\n
1.	Harvesting free energy sources such as natural daylight, to avoid using lights when the sun is shining. Windows were placed in all common spaces and classrooms to make the space brighter and reduce the need for lights.\n
2.	Creating tight exterior walls, where outside air cannot enter the building except through the heating and cooling systems. By creating a sealed envelope, the amount of energy needed to be comfortable in the space is greatly reduced.\n
3.	Using a radiant heating and cooling system, where pipes in the floor flow hot or cold water in them to heat or cool the space. \n
4.	Using ceiling fans to provide air movement in the space to reduce the energy used by the heating and cooling system.\n
5.	Sourcing energy from renewable sources. The solar panels on the roof are designed to offset more energy than the building uses over a year.\n\n
MATERIALS \n
Recommended site locations: Waste/recycling bins on 1st & 2nd floor, 2nd floor ceiling view.\n\n
Sustainable choices were also made in the design and construction phase to manage materials selection for sustainability and human health. Sustainable choices at a building level include:\n
1.	Reducing the number of finishes in the building overall by using raw structural materials as the finished surface. \n
2.	Using materials salvaged from other sources for reuse. If you look up at the buildings ceiling, about 12.5% of the panels used are made from salvaged wood. Other examples include slate roof tiles from the Alumni House reused as interior finishes in the restrooms, and wood joists removed during the renovation of GT’s Tech Tower were used to create the central stairs.\n
3.	Using locally produced materials. Building materials such as brick, carpet tile, and sustainably harvested wood were sourced from the southeast.\n
4.	Sourcing materials that are not made with known “Chemicals of Concern.” These are materials that don’t harm humans or the environment in their production, use, or end of life breakdown stages. \n\n
Materials generated throughout the life of the building are also important. The building is the first classroom building to have “front-of-house" composting on campus as well as hard to recycle materials collection such as plastic films and polystyrene. These services support zero waste objectives for campus operations. \n\n
WATER \n
Recommended site locations: Water system mural on basement level, Compost bins on basement level, Constructed wetland located outside near front entrance.\n\n
The Kendeda Building has a unique sustainable water management system. The Kendeda Building relies upon rainwater, greywater, blackwater and stormwater systems to manage water sustainably. Collectively, these systems supply all the potable water demands for the building while recycling wastewater and stormwater. The Kendeda building relies on each water system in the following ways:\n
- Rain produces stormwater runoff, which can cause flooding of drains, sewer systems, and streets. This project captures the stormwater that falls on site and controls its infiltration back into the soil through rain gardens, permeable pavers, and landscape.\n
- Treated rainwater is the source of all potable (drinkable) water in the building. It falls on the solar panels on the roof and is directed to a cistern in the basement then filtered with UV light to drinkable standards. A 50,000-gallon cistern stores water to overcome drought and provide water resiliency.\n
- Greywater is used water that doesn’t have organic matter in it. Once greywater is used in sinks, showers, and water fountains, it is collected and pumped to the south side of the site near Ferst Drive. It then flows through constructed wetlands where plants and organisms treat the water through natural processes on site. Water then slowly infiltrates back into the soil.\n
- Toilet water/waste is the only source of blackwater on site. The solution for treating blackwater is to use composting toilets. Composting toilets use very little water to capture waste and compost organic matter on site. The use of composting toilets significantly reduced the total water needs for the building and prevented the need to build a wastewater treatment plant on site. The waste from these toilets collects in composters in the basement where it can turn into useful and nutrient-rich fertilizers. The fertilizer will then be hauled off site and reused in a beneficial way.\n',
33.7785,-84.3996,
NULL),

(5,'West Village Dining Commons',
'- The West Village Dining Commons is a highly flexible, 50,000 SF dining, lounge and educational facility that seats over 600 students and includes over 10,000 SF of multi-use academic space.\n
- A composting program began with the building’s opening in Fall 2017. The composting program diverts over 50% of waste from the landfill.\n
- A cistern located on site is used for irrigation.\n
- Current energy model calculates 265 EUI a 61% reduction against baseline requirements.',
'The West Village Dining Commons is a flexible, 50,000 SF dining, lounge and educational facility that seats over 600 students and includes over 10,000 SF of multi-use academic space. The program includes seven food venues, back of house kitchens, four classrooms, faculty and staff offices, two large meeting rooms, and ample dining and study rooms. Flexible open seating is used for student lounge and study areas both inside and outside creating a vibrant, hybrid, multi-purpose gathering place. In addition to connecting a very complicated and steep site, this project’s unique challenges included the desire to draw the Georgia Tech community to the underutilized West Campus where students, faculty, and visitors, can better connect to each other and rejuvenate on campus. \n\n
Situated at the headwaters of the campus Eco-Commons, landscape integration reinforces the sustainable culture and relationship of this project to the campus. Part of a greater master plan that establishes the campus Eco-Commons, landscape integration is a large component of the project, reinforcing the sustainable culture of the campus. Students traverse a bioswale bridge to access the Commons through an adjacent landscaped courtyard between the two nearby residence halls. A central green space with fountain, fire pits, and seating zones provides active and passive options for students. An outdoor stage extends from a central music room to allow for impromptu concerts and gatherings. \n\n
Sustainability features include:\n
•	A composting program began with the building’s opening in Fall 2017. The composting program diverts over 50% of waste from the landfill. \n
•	Current energy model calculates 265 EUI a 61% reduction against baseline requirements\n
•	Electric lighting installed in a manner that allows changes appropriate to season and time of day.\n
•	A cistern located on site is used for irrigation\n
•	Reclaimed and repurposed materials were used in the construction of the building.\n',
33.7796,-84.4046,
NULL),

(6,'The Eco Commons',
'- The overall Eco Commons Project envisions 80 acres of green spaces across campus that follow what were the original naturally occurring stream paths of this region before being urbanized.\n
- The project consists of a series of green spaces that replicate historic, buried streams.\n
- The concept allows Tech to more effectively manage storm water by reducing inflows into city sewers and creating a system for reuse on campus landscapes.In creating this performance landscape, Georgia Tech is practicing thoughtful stewardship of the land by joining it with smart infrastructure.  \n
- Performance features will provide opportunities for student life activities, increased connectivity of human powered living, increased stormwater management, carbon sequestration, and opportunities for education and demonstration.',
'The overall Eco Commons Project envisions 80 acres of green spaces across campus that follow what were the original naturally occurring stream paths of this region before being urbanized. These green spaces are being designed and engineered as part of the 2004 master plan and Landscape Master Plan to reduce storm water runoff by 50%. \n\n
This area of the Eco Commons along Hemphill Avenue is 8 acres of green space that aims to mimic a traditional piedmont woodland. The goal of the Eco-Commons project is to develop strategies and solutions that enhance stormwater management on campus to reduce the impact on the combined sewer outfall (CSO), increase total tree canopy, and reduce the car-centered footprint of campus.\n\n
This renewal project implements regenerative design principles. A lush green space replaced what was formerly the Beringause Building and two surface parking lots. Upgrades to the landscape include extensive compost soil amendments, installation of water infiltration and drainage infrastructure, and planting more than 600 new trees and perennials such as flowering dogwood, yellow daisies, and ferns.  \n\n
Performance features include enhanced bio retention areas, stream-recreation reusing collected stormwater, interconnected rain harvesting cisterns, increased tree canopy coverage, an active infiltration lawn and a network of interconnected permeable paths.\n\n
The project provides opportunities for student life activities and educational opportunities. Embedded in the site is a reflection memorial of the civil rights movement on the former site of a restaurant that closed its doors rather than comply with a desegregation order as required by the 1964 Civil Rights Act. \n\n
By providing this ecological and educational environment on campus this project supports Georgia Tech’s commitment to fostering sustainability initiatives and the campus as a living laboratory. \n\n',
33.7787,-84.4011,
NULL),

(7,'Campus Recreation Center Solar Installation',
'No description provided',
'The Campus Recreation Center (CRC) is a 300,659 sq. ft. facility that was completed in August 2004. This state of the art facility is a unique expansion of the existing swimming and diving venue built for the 1996 Olympic Games. The facility has 2,856 solar panels lining its rooftop and is the largest solar array on Georgia Tech’s Campus.',
33.7755,-84.4034,
NULL),

(8,'Kendeda Solar Installation',
'No description provided',
'The Kendeda Building was completed in 2019 and is the first academic and research building in the Southeast designed to be certified under the Living Building Challenge. The building\'s 330 kW (DC) solar canopy is comprised of 917 PV panels and is expected to generate over 455,000 kWh per year which will support the building’s energy demands including lighting, HVAC system, water system, and plug loads.  The PV array is designed to generate 42 Energy Use Intensity (EUI) kBTU/SF/YR which will offset the building’s 30 EUI kBTU/SF/YR. By harnessing more energy than the building consumes, the systems create a net positive energy facility on an annual basis.\n',
33.7786,-84.3998,
NULL),

(9,'"The First Graduate" Sculpture',
'- The sculpture depicts Ronald L. Yancey, EE 1965, the first African American to graduate from the Georgia Institute of Technology.\n
- Georgia Tech was the first college in the deep South to peacefully integrate without a court order.\n
- The sculpture was made possible due to the generosity of Betsy and Bo Godbold.\n
- The sculpture sits on the interior steps of the Clough Undergraduate Commons.\n
- Artist Marin Dawe created the sculpture.',
'In 1965, Ronald L. Yancey became the first African American to graduate from the Georgia Institute of Technology. Georgia Tech was the first college in the Deep South to peacefully and successfully integrate without a court order. Yancey entered Georgia Tech in September 1962, one year after the Three Pioneers and campus integration. He had completed the first two years of his undergraduate degree at Morehouse College, and during those years, he applied repeatedly to Tech, with no answers provided as to why he kept receiving denials — despite excellent grades and test scores. He was eventually accepted but faced isolation and intimidation on campus.\n\n
“It was a lonely and difficult time,” said Yancey. “‘Glares and stares’ is the best way I can put it, but I try not to reflect on the negative.”\n\n
Though Tech exempted seniors from final exams at the time, Yancey was required to take 18 exams in his five classes during his last three weeks of school. He would prove successful and graduated with a degree in electrical engineering in 1965, becoming the Institute’s first black graduate.\n\n
This significant event is commemorated in the piece, The First Graduate, through the generosity of Betsy and Bo Godbold. The First Graduate sits on the interior steps of Clough Undergraduate Commons and was created by artist Marin Dawe. \n',
33.7748,-84.3965,
NULL),

(10,'"Continuing the Conversation" Sculpture',
'- The sculpture depicts Rosa Parks at two points in her life, at 42 years old, the age when her actions inspired the boycott, and at 92 years old, her age when she died.\n
- The sculpture sits in Georgia Tech’s Harrison Square.\n
- The sculpture was brought to campus through the Arts@Tech initiative. \n
- Artist Marin Dawe created the sculpture. \n',
'Rosa Parks launched a seminal moment in the civil rights movement through a single act of courage. Parks refused to give up her seat on a segregated city bus in Montgomery, Alabama. That bold act sparked the bus boycott, which catapulted Martin Luther King Jr. into the national spotlight and galvanized the civil rights movement. Her strength motivated many to follow in her footsteps and now her presence, through a sculpture on Georgia Tech’s campus, will inspire generations to come. The bronze and granite sculpture installation, located in Harrison Square, depicts Rosa Parks at two stages in her life. Continuing the Conversation depicts Parks at age 42 in 1955 — the year her courageous act of refusing to give up her seat for a white passenger on a Montgomery bus helped launch the yearlong Montgomery bus boycott — and at the age she died, 92. The two sit across from one another, with an empty seat between as an invitation for others to join them in conversation and action. Martin Dawe of Cherrylion Studios, an Atlanta-based artist, was chosen to create the sculpture. \n',
33.7729,-84.3953,
NULL),

(11,'Krone Engineered Biosystems Building',
'- Georgia Tech’s Krone Engineered Biosystems Building (EBB) provides 218,880 square feet of flexible interdisciplinary laboratory space.\n
- The building is Platinum LEED certified.\n
- EBB features extensive technology to support sustainable water use.\n
- EBB sits within the Eco-Commons, Georgia Tech’s largest landscape feature.\n',
'Georgia Tech’s Krone Engineered Biosystems Building (EBB) provides 218,880 square feet of flexible interdisciplinary laboratory space for researchers collaborating in the fields of Chemical Biology, Cell Therapies, and Systems Biology. EBB fits and functions within the Eco-Commons, a permanent and multi-purpose open space with high levels of ecological performance that lays over the entire campus master plan. The building is Platinum LEED certified.\n\n
When Texas-based Lake|Flato and Atlanta–based Cooper Carry began work on the new Engineered Biosystems Building for the campus, it discovered that part of the system originates as an underground stream located in what would someday be the project’s basement. Rather than deal with the stream as an inconvenience, the firm incorporated it into an innovative approach to water sustainability, capturing water from the stream into the building’s water system. As a result, the structure, whose laboratories concentrate on cell therapies and chemical biology and use an enormous amount of water, actually produces a net surplus of water—making the building an active participant in sustainability for the larger campus. “We had the luxury of leveraging the ecological characteristics of the site and the area adjacent to it to create a story about how it all relates to the rest of the campus,” says Ryan Jones, AIA, an associate partner at the Lake|Flato.\n\n
Metrics Snapshot:\n
- Percentage of the site area designed to support vegetation: 61.9\n
- Percentage of site area supporting vegetation before project began: 43.1\n
- Percentage of landscaped areas covered by native or climate appropriate plants supporting native or migratory animals: 58.9\n
- Actual Consumed Energy Use Intensity (Site EUI): 182.06 kBtu/sq ft/yr\n
- Actual net EUI: 180.67 kBtu/sq ft/yr\n
- Actual net carbon emissions: 9,427,148 lb/sq ft/yr\n
- Actual reduction from national average EUI for building type: 49\n
- Predicted annual consumption of potable water for all uses, including process water: 520.5 gal/FTE or 79.43 percent reduction over LEED 2009 baseline\n
- Percentage of water consumed onsite comes from rainwater capture: 11\n
- Percentage of water consumed onsite comes from greywater/blackwater capture and treatment: 10\n
- Percent of rainwater that can be managed on site: 23\n
- Metrics of water quality for any stormwater leaving the site: 80 percent of TSS removed from stormwater runoff\n
- Percentage of floor area or percentage of occupant work stations with direct views of the outdoors: 90.2\n
- Peak measured CO₂ levels during full occupancy: 588ppm\n
- Annual daylighting performance: 35 of regularly occupied area achieving at least 300 lux at least 50 percent of the annual occupied hours.\n',
33.7807,-84.3985,
NULL);
UNLOCK TABLES;

/* Data for table `users` */
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('kpatton33@gatech.edu','$2b$10$EpNeZG2VTX.NzeP2xBSBo.7EM5lbLI9dS6OvRCWSFcPvWdHXQMzXO', 'superadmin');
ALTER TABLE `users` ENABLE KEYS;
UNLOCK TABLES;


LOCK TABLES `filters` WRITE;
ALTER TABLE `filters` DISABLE KEYS;
INSERT INTO `filters` (filter) VALUES ('Buildings and Infrastructure'),('Transportation'),('Grounds'),('Energy and Emissions'),('Materials Management'),('Equity'),('Water');
ALTER TABLE `filters` ENABLE KEYS;
UNLOCK TABLES;

/* Data for table `ocs_info` */
LOCK TABLES `ocs_info` WRITE;
ALTER TABLE `ocs_info` DISABLE KEYS;
INSERT INTO `ocs_info` VALUES ('GT Sustainability information goes here wow this default text is super exciting plz replace me');
ALTER TABLE `ocs_info` ENABLE KEYS;
UNLOCK TABLES;
