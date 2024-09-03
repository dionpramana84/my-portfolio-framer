import Experience from "@/models/Experience";

export const aboutMiningEngineering = `Hello, I'm I Gede Dion Pramana Utama, a Mine Planning enthusiast with a proven track record. I hold a Bachelor's degree from Pembangunan Nasional "Veteran" University (UPN) of Yogyakarta and am currently pursuing my Master's degree at Bandung Institue of Technology (ITB), specializing in Mining Economics of Coal and Minerals. Known for my ability as a fast learner and a dedicated team worker, I'm driven by a relentless desire to excel in the world of mining. 
Let's connect and explore how I can contribute my skills to your team!`;

const experienceData: Experience[] = [
  {
    id: "intern",
    employment_type: "Internship",
    name: "Engineer Internship",
    place: "Kalimantan Timur, Indonesia",
    started_on: "Jan, 2020",
    finished_on: "Mar, 2020",
    skills: [
      "Mine Plan and Design",
      "GEOVIA Surpac",
      "AutoCAD",
      "Global Mapper",
    ],
    description: `
      <p>Retrieval of my essay data about Technical Mine Planning Progress in Coal Mining. The purposes of my essay are:</p>
      <ol>
        <li>To identify the coal resource type in the site.</li>
        <li>To identify the mining direction.</li>
        <li>To create three mine design options and choose from the three options which can give the most profit based on HBA value.</li>
      </ol>
      <br/>
      <p>The result of the essay are:</p>
      <ol>
        <li>The coal resource on the research site is classified as indicated coal based on the distance between the drill hole is 500 to 1000 meters and the research location classified as simple geological conditions.</li>
        <li>The mining cannot be started from the cropline location because it is located in the West Block. The mining direction is carried out from the south to north which is based on the coal seam slope that relative to the north.</li>
        <li>Selected mine design option with 1,800,000 ton/year and 217,000,000 USD income from three options have been created.</li>
      </ol>
    `,
    image_thumbnail: "/mining-experience-1.png",
    images: ["/mining-experience-1.png"],
  },
  {
    id: "mpd",
    employment_type: "Contract",
    name: "Mine Plan Laboratory Assistant",
    place: "Yogyakarta, Indonesia",
    started_on: "July, 2019",
    finished_on: "July, 2020",
    skills: ["Mine Plan and Design", "Micromine", "AutoCAD", "MineScape"],
    description: `
      <p>Assist the lecturer by teaching the students about mine plan and design with mining software (Micromine, Minescape, and AutoCAD):</p>
      
      <ol>
      <br/>
        <li>
          <strong>Micromine (Gold and Nickel Commodity Mine Plan and Design on Surface Mine)</strong>
          <ul>
            <li>Input borehole data, surface map data.</li>
            <li>Pit optimization is based on surface data and borehole data.</li>
            <li>Create pit design from the optimized pit.</li>
            <li>Create the mine scheduling from the pit design.</li>
          </ul>
        </li>
        <br/>
        <li>
          <strong>Minescape (Coal Mine Plan and Design on Surface Mining)</strong>
          <ul>
            <li>Input surface data.</li>
            <li>Input drill hole data.</li>
            <li>Define stratigraphic model.</li>
            <li>Create the batterblock.</li>
            <li>Create the open cut.</li>
          </ul>
        </li>
        <br/>
        <li>
          <strong>AutoCAD (Industrial Minerals Mine Plan and Design on Surface Mining)</strong>
          <ul>
            <li>Input surface data.</li>
            <li>Learning the basics to define pit bottom, create crest and toe of the bench.</li>
            <li>Create the mine design from crest and toe.</li>
          </ul>
        </li>
      </ol>
    `,
  },
  {
    id: "umcp",
    employment_type: "Part-time",
    name: "UPN Mining Competition (UMC) Panelist",
    place: "Yogyakarta, Indonesia",
    started_on: "November, 2019",
    finished_on: "November, 2019",
    skills: ["Micromine"],
    description: `
      <p>Have a role as a judge in a mine plan design competition using Micromine software. Participants' abilities were tested in the following areas:</p>
      <br/>
      <ol>
        <li>Knowledge about Geological Modelling</li>
        <li>Pit Optimization from Block Model</li>
        <li>Design a pit using the optimized pit.</li>
        <li>Calculate mineral reserves, waste, and the value produced if mining is carried out.</li>
        <li>Create a waste dump area with the amount of waste to be removed.</li>
        <li>Assess participants' abilities based on mine design decisions that have been made.</li>
      </ol>
    `,
  },
  {
    id: "ymcccm",
    employment_type: "Part-time",
    name: "Youth Mining Camp Competition (YMCC) Committee Member",
    place: "Yogyakarta, Indonesia",
    started_on: "March, 2018",
    finished_on: "October, 2019",
    skills: ["Time Management", "Communication"],
    description: `
      <p>Coordinate and assist the Assessment Team to create a competitive Minescape Competition.</p>
    `,
    image_thumbnail: "/mining-experience-3.png",
    images: ["/mining-experience-3.png"],
  },
];

export default experienceData;
