import React, { useState } from "react";
import { Drawer, Skeleton } from "@mui/material";
import Navbar from "../components/Navbar/navbar-component";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowDropUp } from "react-icons/md";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import dashboard from "../../src/images/dashboard.png";
import modulo1 from "../../src/images/modulo1.png";
import modulo2 from "../../src/images/modulo2.png";
import modulo3 from "../../src/images/modulo3.png";
import modulo4 from "../../src/images/modulo4.png";
import ModuleOneComponent from "../components/Modules/module-one-component";
import ModuleTwoComponent from "../components/Modules/module-two-component";
import ModuleThreeComponent from "../components/Modules/module-three-component";
import ModuleFourComponent from "../components/Modules/module-four-component";

const drawerStyle = {
    width: "275px",
    flexShrink: 0,
    "& .MuiDrawer-paper": {
        width: "275px", // Adjust the width as needed
        backgroundColor: "#3D5BAA",
        color: "#FFF", // Text color
        "& h1": {
            fontSize: "24px", // Adjust the font size as needed
            margin: "20px", // Adjust the margin as needed
        },
    },
}

const accordionStyle = {
    "& .MuiAccordionSummary-content": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    "& .MuiAccordionSummary-expandIcon": {
        color: "#FFF",
    },
    "& .MuiAccordionSummary-root": {
        backgroundColor: "#B4C7F8",
        color: "#3D5BAA",
        boderRadius: "10px"
    },
    "& .MuiAccordionDetails-root": {
        backgroundColor: "#FFF",
        padding: "0px",
        color: "#000",

    },
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

export default function Dashboard() {

    const [expanded, setExpanded] = useState(false);

    const [progression, setProgression] = useState(0);

    const [curModule, setCurModule] = useState(1);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Navbar />

            <Drawer variant="permanent" anchor="left" sx={drawerStyle} >

                <div className="m-2">
                    <div className="w-full flex justify-center pt-2">
                        <img src={dashboard} alt="" className="w-45 h-45 rounded-sm " />
                    </div>
                    <div className="flex flex-col gap-1 py-2">
                        <label>Progresso</label>
                        <BorderLinearProgress variant="determinate" value={progression} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="w-full rounded-lg overflow-hidden">
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={accordionStyle}
                                onClick={() => { setCurModule(1); setProgression(25) }}
                            >
                                <AccordionSummary
                                    expandIcon={<MdOutlineArrowDropDown />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Módulo 1</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <img src={modulo1} alt="" className="w-full" />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className="w-full rounded-lg overflow-hidden"
                            onClick={() => { setCurModule(2); setProgression(50) }}
                        >
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={accordionStyle}>
                                <AccordionSummary
                                    expandIcon={<MdOutlineArrowDropDown />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Módulo 2</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <img src={modulo2} alt="" className="w-full" />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className="w-full rounded-lg overflow-hidden"
                            onClick={() => { setCurModule(3); setProgression(75) }}
                        >
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={accordionStyle}>
                                <AccordionSummary
                                    expandIcon={<MdOutlineArrowDropDown />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Módulo 3</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <img src={modulo3} alt="" className="w-full" />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className="w-full rounded-lg overflow-hidden"
                            onClick={() => { setCurModule(4); setProgression(100) }}
                        >
                            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={accordionStyle}>
                                <AccordionSummary
                                    expandIcon={<MdOutlineArrowDropDown />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Módulo 4</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <img src={modulo4} alt="" className="w-full" />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </Drawer>
            <aside className="ml-[275px]">
                <div className="flex justify-center w-full h-screen">
                    {
                        curModule === 1 ? (
                            <div className="w-full flex justify-center">
                                <ModuleOneComponent />
                            </div>
                        ) : curModule === 2 ? (
                            <div className="w-full flex justify-center">
                                <ModuleTwoComponent />
                            </div>
                        ) : curModule === 3 ? (
                            <div className="w-full flex justify-center">
                                <ModuleThreeComponent />
                            </div>
                        ) : (
                            <div className="w-full flex justify-center">
                                <ModuleFourComponent />
                            </div>
                        )
                    }
                </div>
            </aside>
        </div >
    )
}