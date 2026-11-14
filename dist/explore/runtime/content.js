const research={
  "checkedAt": "2026-11-12",
  "scope": "Primary-source fact research for expanded Silent Explorers; source excerpts paraphrased. Historical facts and application simulations must be separately labelled.",
  "globalCautions": [
    "All six surface machines are inactive. No dashboard values represent live telemetry.",
    "Map coordinates describe landing sites unless explicitly stated otherwise; they are not final rover resting coordinates.",
    "NASA pages mix UTC, Pacific calendar dates, historical datums and updated planetocentric coordinates. Preserve each source's basis.",
    "MER instrument work was in situ; educational sample collection must not imply Spirit or Opportunity cached or returned physical rock samples.",
    "Apollo LRV used non-rechargeable batteries; do not offer solar recharge as historical hardware behavior. Viking 1 lander used RTGs, not solar panels."
  ],
  "missions": [
    {
      "id": "apollo",
      "name": "Apollo 17 Lunar Roving Vehicle",
      "world": "Moon",
      "dates": [
        {
          "date": "1972-12-07",
          "event": "Apollo 17 launched",
          "basis": "UTC date"
        },
        {
          "date": "1972-12-11",
          "event": "Lunar module Challenger landed at Taurus-Littrow",
          "basis": "UTC date"
        },
        {
          "date": "1972-12-14",
          "event": "Crew departed lunar surface; rover left behind",
          "basis": "UTC date"
        },
        {
          "date": "1972-12-19",
          "event": "Apollo 17 crew splashdown",
          "basis": "UTC date"
        }
      ],
      "location": {
        "label": "Apollo 17 lunar module landing site, Taurus-Littrow",
        "latitude": 20.1911,
        "longitude": 30.7723,
        "coordinateType": "planetocentric Mean Earth/Polar Axis Lunar Reference System, DE421",
        "sourcePrecision": "Four decimal places in NASA updated LRO-derived site table; this is LM position, not rover position.",
        "markerType": "confirmed landing site",
        "finalHardwareLocation": "Rover parked at VIP site approximately 158 metres from the lunar module; exact rover coordinates not verified in this audit.",
        "source": "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html"
      },
      "hardware": [
        "Three-part folding aluminum chassis",
        "Four wire-mesh wheels with titanium chevrons",
        "Individual electric drive motor at each wheel",
        "Front and rear electric steering",
        "Double-wishbone suspension with torsion bars",
        "Two foldable seats and central T-shaped hand controller",
        "Directional gyro, wheel odometer and navigation computer",
        "Sun-shadow device for manual heading checks",
        "High-gain antenna and communications/TV equipment"
      ],
      "power": {
        "type": "Two non-rechargeable silver-zinc potassium hydroxide batteries",
        "voltageEach": 36,
        "capacityEachAh": 121,
        "note": "Battery-powered rather than solar-powered. Solar recharge would be fictional."
      },
      "navigation": "Directional gyro and odometer fed a computer that tracked bearing and distance back to the lunar module; Sun-shadow device provided manual heading information.",
      "science": [
        "Rover extended geological traverses and carried astronauts, tools and collected samples.",
        "At Shorty crater, astronauts collected orange soil later identified as titanium-rich volcanic glass beads.",
        "Apollo 17 returned samples and deployed surface experiments; the rover itself did not return to Earth."
      ],
      "ending": "Parked on the Moon and used to televise lunar liftoff. No current operational claim.",
      "sources": [
        "https://www.nasa.gov/mission/apollo-17/",
        "https://www.nasa.gov/history/50-years-ago-apollo-17-lands-at-taurus-littrow/",
        "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html",
        "https://www.nasa.gov/wp-content/uploads/static/apollo50th/pdf/A17_PressKit.pdf",
        "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html"
      ],
      "conflicts": [
        "NASA LRV page gives Apollo17 travel 35.9 km; other NASA histories use 35.744 km / 35.7 km. Avoid excessive precision or note source-specific total.",
        "Older Apollo mission report gives LM20.19080N,30.77168E; use updated LRO-derived20.1911N,30.7723E for current map."
      ]
    },
    {
      "id": "surveyor",
      "name": "Surveyor 3",
      "world": "Moon",
      "dates": [
        {
          "date": "1967-04-17",
          "event": "Launch"
        },
        {
          "date": "1967-04-20",
          "event": "Soft landing",
          "basis": "00:04:17 UT reported by NASA Science"
        },
        {
          "date": "1967-05-04",
          "event": "Last contact"
        },
        {
          "date": "1969-11-20",
          "event": "Apollo 12 second EVA visited Surveyor and recovered selected components",
          "basis": "UTC; NASA mission article/photo historical dates"
        }
      ],
      "location": {
        "label": "Surveyor 3 landing site, Oceanus Procellarum",
        "latitude": -3,
        "longitude": -23.41,
        "coordinateType": "Historical NASA-reported degrees south/west; datum not stated on source page",
        "sourcePrecision": "Coarse historical location; show approximate marker, not exact survey position.",
        "markerType": "approximate landing site",
        "finalHardwareLocation": "Main lander remains on Moon; selected components returned by Apollo12.",
        "source": "https://science.nasa.gov/mission/surveyor-3/"
      },
      "instruments": [
        "Television camera",
        "Soil-mechanics surface sampler"
      ],
      "science": [
        "Returned 6,326 television images.",
        "Surface sampler dug trenches, made bearing tests and manipulated soil within camera view.",
        "Soil tests informed understanding of whether the lunar surface could support crewed spacecraft."
      ],
      "returnedComponents": [
        "Television camera",
        "Soil sampler scoop",
        "Cable sections",
        "Painted and unpainted support tubing"
      ],
      "returnedComponentsNote": "Apollo12 returned selected parts for exposure studies, not the entire lander. JPL archive lists camera, cable, tubing and trenching scoop; Apollo12 mission report identifies cable, painted tube, unpainted tube, camera and scoop.",
      "ending": "Contact ended May4,1967 after lunar night began; lander remained available for Apollo12 examination.",
      "sources": [
        "https://science.nasa.gov/mission/surveyor-3/",
        "https://www.jpl.nasa.gov/missions/surveyor-3/",
        "https://www.jpl.nasa.gov/blog/2012/1/surveyor-3-camera-returned-from-the-moon",
        "https://www.nasa.gov/missions/apollo/apollo-12-the-pinpoint-mission/",
        "https://sma.nasa.gov/SignificantIncidents/assets/a12_missionreport.pdf",
        "https://science.nasa.gov/resource/apollo-12-and-surveyor-3/"
      ],
      "conflicts": [
        "Surveyor3 NASA Science narrative incorrectly says Apollo12 landed Nov18 and visited on Nov19; Apollo12 official mission chronology and photographic dates give landing Nov19 and secondEVA visit Nov20UTC. Use Apollo12 chronology.",
        "The historical Apollo12 visit's UTC date differs from local US evening calendar date; state time basis."
      ]
    },
    {
      "id": "opportunity",
      "name": "Opportunity (MER-B)",
      "world": "Mars",
      "dates": [
        {
          "date": "2003-07-07",
          "event": "Launch",
          "basis": "Pacific date; NASA lists20:18:15PDT, corresponding to2003-07-08UTC"
        },
        {
          "date": "2004-01-25",
          "event": "Landing in Eagle crater, Meridiani Planum",
          "basis": "UTC;2004-01-24Pacific"
        },
        {
          "date": "2018-06-10",
          "event": "Final communication"
        },
        {
          "date": "2019-02-13",
          "event": "NASA declared mission complete"
        }
      ],
      "location": {
        "label": "Opportunity landing site, Eagle crater / Meridiani Planum",
        "latitude": -1.9483,
        "longitude": -5.52583,
        "originalLongitudeEast": 354.47417,
        "coordinateType": "NASA historical landing coordinates; longitude converted from0..360east to-180..180east",
        "sourcePrecision": "Source reports1.9483S354.47417E; datum not specified in mission article. Global map is illustrative.",
        "markerType": "reported landing site",
        "finalHardwareLocation": "Final resting location is Perseverance Valley at Endeavour crater, not Eagle crater landing site. No final-resting coordinate verified here.",
        "source": "https://science.nasa.gov/mission/mer-opportunity/"
      },
      "instruments": [
        "Pancam panoramic cameras",
        "Navcam navigation cameras",
        "Mini-TES miniature thermal emission spectrometer",
        "Mössbauer spectrometer",
        "Alpha Particle X-ray Spectrometer(APXS)",
        "Microscopic Imager",
        "Rock Abrasion Tool(RAT)",
        "Dust collection magnets"
      ],
      "hardware": [
        "Six-wheel rocker-bogie mobility",
        "Robotic instrument arm",
        "Solar arrays and rechargeable batteries",
        "High-gain/low-gain antennas and orbiter-relay communications"
      ],
      "science": [
        "Hematite-rich spherules called blueberries and rock textures provided evidence for ancient water.",
        "Investigated multiple ancient environments that could have supported microbial life; did not establish that life existed.",
        "Drove45.16km before final communication; greatly exceeded90-sol prime mission."
      ],
      "ending": "2018 planet-encircling dust storm reduced available sunlight. Rover last communicatedJune10,2018; recovery efforts endedFebruary13,2019.",
      "sources": [
        "https://science.nasa.gov/mission/mer-opportunity/",
        "https://www.jpl.nasa.gov/missions/mars-exploration-rover-opportunity-mer/",
        "https://www.jpl.nasa.gov/news/mineral-in-mars-berries-adds-to-water-story/",
        "https://www.jpl.nasa.gov/images/pia19113-martian-concretions-near-fram-crater/",
        "https://www.jpl.nasa.gov/images/pia05251-mars-exploration-rover-mer-b-opportunity-landing-site/"
      ],
      "conflicts": [
        "Landing Jan24Pacific and Jan25UTC are the same event.",
        "Do not use source narrative's Jan3,2014 ten-year-anniversary sentence; Opportunity's anniversary belongs to Jan24Pacific/Jan25UTC."
      ]
    },
    {
      "id": "spirit",
      "name": "Spirit (MER-A)",
      "world": "Mars",
      "dates": [
        {
          "date": "2003-06-10",
          "event": "Launch"
        },
        {
          "date": "2004-01-04",
          "event": "Gusev crater landing",
          "basis": "UTC;2004-01-03Pacific"
        },
        {
          "date": "2006",
          "event": "Right-front wheel became immobile"
        },
        {
          "date": "2007",
          "event": "Dragging wheel exposed silica-rich soil"
        },
        {
          "date": "2009",
          "event": "Became trapped in soft soil at Troy near Home Plate",
          "basis": "Some sources sayApril; NASA Science narrative saysMay1. Useyear orApril–May unless a specific source is cited."
        },
        {
          "date": "2010-03-22",
          "event": "Last communication"
        },
        {
          "date": "2011-05-25",
          "event": "Recovery efforts ended",
          "basis": "NASA Science; JPL announcement publishedMay24 described upcoming final command attempts"
        }
      ],
      "location": {
        "label": "Spirit landing site, Gusev crater / Columbia Memorial Station",
        "latitude": -14.5692,
        "longitude": 175.4729,
        "coordinateType": "NASA-reported historical landing coordinates; datum not specified on mission page",
        "sourcePrecision": "Source4decimal places; illustrative global map rather than exact route reconstruction.",
        "markerType": "reported landing site",
        "finalHardwareLocation": "Spirit rests atTroy near Home Plate in Columbia Hills region; not at the initial landing marker. Exact final-resting coordinates not verified here.",
        "source": "https://science.nasa.gov/mission/mer-spirit/"
      },
      "instruments": [
        "Pancam",
        "Navcam",
        "Mini-TES",
        "Mössbauer spectrometer",
        "APXS",
        "Microscopic Imager",
        "Rock Abrasion Tool",
        "Dust collection magnets"
      ],
      "science": [
        "Explored Columbia Hills and climbed Husband Hill.",
        "Nearly pure silica exposed by dragging wheel was consistent with an ancient hot-spring or steam-vent environment.",
        "Home Plate observations supported ancient explosive volcanic activity.",
        "Trapped-rover studies continued to return useful soil information."
      ],
      "ending": "Mobility loss and inability to achieve a favorable winter solar tilt preceded final contact. Severe cold and declining solar energy are probable explanations, not directly observed failure telemetry.",
      "sources": [
        "https://science.nasa.gov/mission/mer-spirit/",
        "https://www.jpl.nasa.gov/news/nasas-spirit-rover-completes-mission-on-mars/",
        "https://www.jpl.nasa.gov/news/nasa-concludes-attempts-to-contact-mars-rover-spirit/",
        "https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20160001767.pdf",
        "https://www.jpl.nasa.gov/news/nasa-trapped-mars-rover-finds-evidence-of-subsurface-water/"
      ],
      "conflicts": [
        "Landing Jan3Pacific andJan4UTC are same event.",
        "Trapping date variesApril versusMay2009; avoid unjustified single-day precision.",
        "Conclude recoveryMay25 while announcement dateMay24; distinguish events."
      ]
    },
    {
      "id": "viking",
      "name": "Viking 1 lander",
      "world": "Mars",
      "dates": [
        {
          "date": "1975-08-20",
          "event": "Launch"
        },
        {
          "date": "1976-06-19",
          "event": "Entered Mars orbit"
        },
        {
          "date": "1976-07-20",
          "event": "Landed in Chryse Planitia",
          "basis": "11:53:06UT in NASA Science"
        },
        {
          "date": "1976-07-28",
          "event": "First soil sample collected by arm"
        },
        {
          "date": "1982-11-11",
          "event": "Final data transmission per NASA image/archive sources"
        },
        {
          "date": "1982-11-13",
          "event": "Lander end of mission per NASA Viking Project and NSSDC"
        }
      ],
      "location": {
        "label": "Viking1 lander, Chryse Planitia",
        "latitude": 22.27,
        "longitude": -47.95,
        "originalLongitudeEast": 312.05,
        "coordinateType": "planetocentric, explicitly identified in NASA Viking Project/NSSDC source",
        "sourcePrecision": "Two decimal places; reported landing-site position, no sub-metre precision implied.",
        "markerType": "reported landing site; stationary lander",
        "finalHardwareLocation": "Lander remains at landing site.",
        "source": "https://nssdc.gsfc.nasa.gov/planetary/viking.html"
      },
      "instruments": [
        "Two facsimile imaging cameras",
        "Gas Chromatograph Mass Spectrometer(GCMS)",
        "X-Ray Fluorescence Spectrometer",
        "Biology experiments: Gas Exchange, Labeled Release, Pyrolytic Release",
        "Weather package: temperature, pressure and wind",
        "Remote soil-sampler arm",
        "Seismometer carried but failed to deploy and returned no useful seismic data"
      ],
      "power": "Two SNAP-19 radioisotope thermoelectric generators; not solar panels.",
      "science": [
        "Returned historical surface images and atmospheric/weather observations.",
        "Analyzed soil chemistry and conducted biology experiments.",
        "Biology results showed chemical activity and ambiguous responses; no definitive evidence for Martian life was established."
      ],
      "ending": "Communication ceased inNovember1982 after a command-related problem; distinguish final-data dateNov11 from commonly listed mission-end dateNov13 rather than asserting a single uncontested date.",
      "sources": [
        "https://science.nasa.gov/mission/viking-1/",
        "https://science.nasa.gov/mission/viking/",
        "https://nssdc.gsfc.nasa.gov/planetary/viking.html",
        "https://www.jpl.nasa.gov/images/pia09703-viking-lander-model/",
        "https://pds.nasa.gov/ds-view/pds/viewContext.jsp?identifier=urn%3Anasa%3Apds%3Acontext%3Ainstrument_host%3Aspacecraft.vl1&version=1.2",
        "https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/19890016985.pdf"
      ],
      "conflicts": [
        "NASA Science individual mission page gives22.483N47.94W without datum; project/NSSDC explicitly planetocentric22.27N312.05E. Do not mix coordinate systems.",
        "NASA Science individual mission page conflatesNov11 final transmission with command/end date. Project pages listNov13. UseNovember1982 for broad summaries, explain both in detail.",
        "Do not conflate Viking1 andViking2 seismometer performance or lander/orbiter power sources."
      ]
    },
    {
      "id": "insight",
      "name": "InSight lander",
      "world": "Mars",
      "dates": [
        {
          "date": "2018-05-05",
          "event": "Launch"
        },
        {
          "date": "2018-11-26",
          "event": "Landed in Elysium Planitia",
          "basis": "19:52:59UTC fromNASA11:52:59Pacific"
        },
        {
          "date": "2019-04-06",
          "event": "First likely marsquake recorded bySEIS"
        },
        {
          "date": "2021-01-14",
          "event": "NASA announced end of HP3 mole recovery effort after finalJan9hammering"
        },
        {
          "date": "2022-12-15",
          "event": "Last communication"
        },
        {
          "date": "2022-12-21",
          "event": "Mission retirement announced"
        }
      ],
      "location": {
        "label": "InSight actual landing site, western Elysium Planitia",
        "latitude": 4.502,
        "longitude": 135.623,
        "coordinateType": "Published landing-site geology location, rounded from4.502384N135.623447E",
        "sourcePrecision": "Rounded to0.001degree for educational map; not prelanding ellipse center.",
        "markerType": "published landing location; stationary lander",
        "finalHardwareLocation": "Lander remains at landing site.",
        "source": "https://ntrs.nasa.gov/api/citations/20205003726/downloads/Golombek_Geology_of%20_InSight_landing_site_2020_Nature_communications_s41467-020-14679-1.pdf"
      },
      "instruments": [
        "SEIS(Seismic Experiment for Interior Structure), supplied byCNES with international contributions",
        "HP3(Heat Flow and Physical Properties Package), supplied byDLR",
        "RISE(Rotation and Interior Structure Experiment), precision X-band radio science",
        "Instrument Deployment Arm with grapple",
        "Instrument Deployment Camera(IDC)",
        "Instrument Context Camera(ICC)",
        "Weather and magnetic/environmental sensors"
      ],
      "science": [
        "SEIS recorded1,319marsquakes according to final NASA/JPL report.",
        "Seismic observations constrained properties of Mars' crust,mantle and core.",
        "RISE radio tracking investigated rotational wobble and interior properties.",
        "HP3 did not reach the depth needed for the intended subsurface heat-flow experiment."
      ],
      "hp3Failure": "Unexpected clumping/soil properties deprived the self-hammering mole of the friction it needed to dig. Arm/scoop-assisted attempts did not achieve sufficient depth. Do not portray failure as proof of hard bedrock or a successful deep heat-flow measurement.",
      "seis": "Ground-deployed sensitive seismometer distinguished marsquake signals from wind, temperature and spacecraft disturbances; educational waveforms are simulated unless actual source datasets are supplied.",
      "ending": "Dust accumulation reduced solar production. After failed contacts, team concluded batteries had run out of energy. Last contactDec15; retirement announcementDec21,2022.",
      "sources": [
        "https://science.nasa.gov/mission/insight/",
        "https://science.nasa.gov/mission/insight/spacecraft/",
        "https://www.jpl.nasa.gov/news/nasas-insight-detects-first-likely-quake-on-mars/",
        "https://www.jpl.nasa.gov/news/nasa-insights-mole-ends-its-journey-on-mars/",
        "https://www.jpl.nasa.gov/news/nasa-retires-insight-mars-lander-mission-after-years-of-science/",
        "https://ntrs.nasa.gov/api/citations/20205003726/downloads/Golombek_Geology_of%20_InSight_landing_site_2020_Nature_communications_s41467-020-14679-1.pdf"
      ],
      "conflicts": [
        "4.5N135.9E on NASA landing/press pages is a prelanding region or ellipse center, not the final lander position. Use published actual site4.502N135.623E.",
        "NASA mission page labelsDec15as end of mission; retirement announcement isDec21. Display both event names.",
        "Do not implyHP3met its deep heat-flow objective."
      ]
    }
  ]
}
;
const mer=[['Mobility','Six wheels and a rocker-bogie suspension spread loads and help the rover negotiate uneven ground. The source model has no independently jointed wheel nodes.','suspension'],['Solar arrays','Photovoltaic arrays supplied electrical power; dust and seasonal sunlight changed the available energy.','panels'],['Robotic arm','The instrument deployment device positioned contact instruments against rock and soil targets.','arm'],['Pancam','A pair of panoramic cameras provided stereo and multispectral views for geology and route context.','mast'],['Navcam','Navigation cameras helped operators understand terrain and plan safe movement.','mast'],['Microscopic Imager','Close images revealed textures of rocks and soil; it was a camera, not a sample-return system.','instruments'],['APXS','The Alpha Particle X-ray Spectrometer investigated elemental composition at contact targets.','instruments'],['Mössbauer spectrometer','This instrument studied iron-bearing minerals to investigate rock formation and alteration.','instruments'],['Rock Abrasion Tool','The RAT removed weathered surfaces so instruments could study fresher rock underneath.','arm'],['Mini-TES','A miniature thermal emission spectrometer helped identify minerals remotely.','mast'],['Communications','Antennas supported direct communication and relay through Mars orbiters.','body']];
const details={
apollo:{short:'Apollo 17',kind:'Lunar Roving Vehicle',era:'1972',place:'Taurus–Littrow',tagline:'The last parking spot.',theme:'lunar',model:null,activity:'route',power:'battery',metric:'3 traverses',narrative:'An electric vehicle changed the scale of lunar fieldwork. Eugene Cernan and Harrison Schmitt drove across Taurus–Littrow, choosing stations where rocks could reveal the history of the valley. Their rover carried people, tools and samples. It stayed on the Moon when they left.',question:'How much science can fit into a limited traverse?',components:[['Chassis','A folding three-part aluminum chassis allowed the rover to fit beside the lunar module descent stage.','body'],['Wire-mesh wheels','Four wire-mesh wheels with titanium chevrons provided traction on lunar regolith.','wheels'],['Suspension','Double-wishbone suspension and torsion bars helped keep the wheels in contact with uneven ground.','suspension'],['Steering','Front and rear electric steering responded to the astronaut’s central hand controller.','steering'],['Seats and hand controller','Two folding seats and a T-shaped controller supported astronaut driving in pressure suits.','controls'],['Navigation','A directional gyro, wheel odometer and computer tracked bearing and distance back to the lunar module.','navigation'],['Sun-shadow device','Astronauts used the Sun-shadow device to check heading information manually.','navigation'],['Batteries','Two non-rechargeable 36-volt silver-zinc batteries supplied energy. The rover had no solar recharge system.','power'],['Antennas and television','High-gain communications equipment and a remotely operated television camera connected fieldwork and lunar liftoff to Earth.','communications'],['Geology equipment','Tools and sample containers supported astronaut field geology; the rover did not analyze rock chemistry autonomously.','science']]},
surveyor:{short:'Surveyor 3',kind:'Robotic lunar lander',era:'1967',place:'Oceanus Procellarum',tagline:'The explorer we went back to.',theme:'lunar',model:null,activity:'landing',power:'solar',metric:'6,326 images',narrative:'Before astronauts could trust the lunar ground, robots had to touch it. Surveyor 3 photographed its surroundings and used a surface sampler to investigate the soil. Two years later, Apollo 12 astronauts walked to the lander and brought selected components home for study.',question:'What can a robotic scoop tell us about a landing site?',components:[['Lander frame','The lightweight frame supported the camera, power and communications equipment above a three-legged landing system.','body'],['Landing legs and footpads','Three legs and broad footpads distributed the landing load across the lunar surface.','legs'],['Television camera','The camera returned thousands of images and let operators observe the soil sampler’s work.','camera'],['Soil-mechanics sampler','A remotely commanded scoop dug trenches, manipulated soil and performed bearing tests.','sampler'],['Solar power','Solar cells supplied electricity during the lunar day. Contact ended before a new operational lunar day.','power'],['Communications','Radio systems transmitted images and engineering information to Earth.','communications'],['Returned components','Apollo 12 recovered the camera, sampler scoop, cable and tubing pieces. Most of the lander remained on the Moon.','history']]},
opportunity:{short:'Opportunity',kind:'Mars Exploration Rover · MER-B',era:'2004–2018',place:'Meridiani Planum → Endeavour',tagline:'Ninety sols. Fourteen years.',theme:'rust',model:'mer',activity:'water',power:'solar',metric:'45.16 km',narrative:'Opportunity rolled into Eagle crater and found clues to an ancient watery environment. Hematite-rich spherules and layered outcrops helped scientists reconstruct a changing Mars. A mission planned for 90 sols became a traverse lasting more than fourteen years, until a global dust storm cut the sunlight.',question:'Which observations make the strongest case for ancient water?',components:mer},
spirit:{short:'Spirit',kind:'Mars Exploration Rover · MER-A',era:'2004–2010',place:'Gusev crater · Columbia Hills',tagline:'A broken wheel. A new discovery.',theme:'ochre',model:'mer',activity:'route',power:'solar',metric:'Columbia Hills',narrative:'Spirit’s path led from the plains of Gusev crater into the Columbia Hills. Its geology differed from Opportunity’s. When a wheel stopped turning, the dragging wheel exposed silica-rich soil—evidence consistent with ancient hot springs or steam vents. Mobility loss became part of the scientific story.',question:'How can a mechanical limitation change a science plan?',components:mer},
viking:{short:'Viking 1',kind:'Stationary Mars laboratory',era:'1976–1982',place:'Chryse Planitia',tagline:'A question that still matters.',theme:'sand',model:'viking',activity:'analysis',power:'rtg',metric:'First U.S. Mars landing',narrative:'Viking 1 placed a sophisticated laboratory on Mars. Its cameras, weather package, chemistry instruments and biology experiments transformed the red planet from a distant disk into a place of measurements. Some biological responses were intriguing, but the experiments did not establish that Martian life existed.',question:'When does a result become evidence—and when is it still uncertain?',components:[['Lander structure','The deck supported instruments, electronics, cameras and communications equipment.','body'],['Legs and footpads','Three landing legs supported the stationary laboratory on the surface.','legs'],['Cameras','Two facsimile cameras scanned the landscape to build detailed images.','camera'],['Sampling arm','A remotely commanded arm delivered soil to onboard experiments.','sampler'],['Biology experiments','Gas Exchange, Labeled Release and Pyrolytic Release investigated possible biological processes. Responses required interpretation alongside chemistry and controls.','biology'],['Chemistry instruments','GCMS and X-ray fluorescence investigated molecular and elemental composition.','science'],['Weather package','Temperature, wind and pressure observations monitored the Martian environment.','weather'],['RTG power','Two SNAP-19 radioisotope thermoelectric generators supplied electrical power. Viking 1 did not depend on solar arrays.','power'],['Seismometer','Viking 1 carried a seismometer, but it failed to deploy and returned no useful seismic measurements.','science'],['Communications','Radio communication connected lander observations with Earth and mission operations.','communications']]},
insight:{short:'InSight',kind:'Planetary interior observatory',era:'2018–2022',place:'Elysium Planitia',tagline:'Still on the surface. Deep inside Mars.',theme:'sage',model:'insight',activity:'deployment',power:'solar',metric:'1,319 marsquakes',narrative:'InSight listened to the planet beneath its feet. Seismic waves helped scientists investigate the crust, mantle and core. Its arm placed instruments on the ground, while radio tracking studied planetary rotation. The heat probe struggled with soil that did not provide the friction it needed. Dust eventually reduced solar power beyond recovery.',question:'How can vibrations reveal the inside of a planet?',components:[['SEIS','The ground-deployed Seismic Experiment for Interior Structure recorded marsquakes and other vibrations. Complete SEIS coverage is not certified in this model.','seis'],['HP3','The Heat Flow and Physical Properties Package was intended to measure subsurface heat flow. Its mole failed to reach the required depth.','hp3'],['Deployment arm','The arm and grapple positioned instruments. Named arm geometry exists, but component motion is disabled pending kinematic validation.','arm'],['Deployment camera','The Instrument Deployment Camera helped assess the workspace and instrument placement.','IDC'],['Solar arrays','Two circular arrays supplied energy; accumulated dust reduced production over time.','panel'],['RISE','Precision radio tracking investigated rotation and interior properties.','radio'],['Environmental sensors','Weather and environmental observations helped distinguish disturbances from seismic signals.','weather'],['Lander deck','The stationary platform held equipment and provided the workspace for instrument deployment.','deck']]}
};
export const missions=research.missions.map((m,i)=>({...m,...details[m.id],number:String(i+1).padStart(2,'0')}));
export const getMission=id=>missions.find(m=>m.id===id)||missions[2];
export const games=[{id:'collector',name:'Rock Collector',label:'Field geology',description:'Drive a tactical traverse, avoid obstacles and record three observations.'},{id:'analysis',name:'Sample Analysis',label:'Evidence & uncertainty',description:'Allocate experiments, read results and distinguish inference from proof.'},{id:'water',name:'Find the Water',label:'Planetary geology',description:'Combine mineral and texture evidence to test an ancient-water hypothesis.'},{id:'landing',name:'Safe Landing',label:'Flight dynamics',description:'Control descent speed with limited fuel in a simplified lunar lander.'},{id:'power',name:'Power Management',label:'Engineering',description:'Balance thermal protection, science and communications through a dusty sol.'},{id:'deployment',name:'Instrument Deployment',label:'Planetary interiors',description:'Place a seismometer away from unstable ground and identify a simulated marsquake.'},{id:'route',name:'Mission Route Planning',label:'Navigation',description:'Draw a safe path through science stations within the traverse budget.'},{id:'component',name:'Identify the Component',label:'Hardware knowledge',description:'Match operational needs to actual mission hardware.'}];
export const nav=[['missions','Explore missions','01'],['museum','Mission museum','02'],['machine','Inside the machine','03'],['simulator','Rover simulator','04'],['lab','Science lab','05'],['control','Mission control','06'],['map','Mission map','07'],['progress','Your field journal','08']];
