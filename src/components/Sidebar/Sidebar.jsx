import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListSubheader,
  Box,
  Button,
  Typography,
  Card,
  IconButton,
} from "@mui/material";
import { ExpandLess, ExpandMore, Lock, LockOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ViewCarousel as ViewCarouselIcon,
  People as PeopleIcon,
  ArrowRightOutlined as ArrowRightOutlinedIcon,
  CategoryOutlined as CategoryOutlinedIcon,
  LocalMall as LocalMallIcon,
  Engineering as EngineeringIcon,
  Details as DetailsIcon,
  Policy as PolicyIcon,
  InfoOutlined as InfoOutlinedIcon,
  Menu as MenuIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from "@mui/icons-material";

const Sidebar = () => {
  const [open, setOpen] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(() => {
    // Load initial state from localStorage
    const savedDrawerState = localStorage.getItem("drawerOpen");
    return savedDrawerState === "true";
  });
  const [lockSidebar, setLockSidebar] = useState(() => {
    // Load initial lock state from localStorage
    const savedLockState = localStorage.getItem("lockSidebar");
    return savedLockState === "true";
  });

  useEffect(() => {
    // Save drawerOpen state to localStorage whenever it changes
    localStorage.setItem("drawerOpen", drawerOpen);
  }, [drawerOpen]);

  useEffect(() => {
    // Save lockSidebar state to localStorage whenever it changes
    localStorage.setItem("lockSidebar", lockSidebar);
  }, [lockSidebar]);

  const handleClick = (category) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [category]: !prevOpen[category],
    }));
  };

  const toggleDrawer = () => {
    if (!lockSidebar) {
      setDrawerOpen((prev) => !prev);
    }
  };

  const toggleLock = () => {
    setLockSidebar((prevLock) => !prevLock);
    if (!drawerOpen && !lockSidebar) {
      setDrawerOpen(true); // Ensure drawer is open when locked
    }
  };

  const iconColor = "grey";

  const sidebarCategories = [
    {
      category: "Admin",
      items: [
        {
          subcategoryname: "Admin",
          subjectnames: ["admin"],
          icon: <AdminPanelSettingsIcon sx={{ color: iconColor }} />,
        },
      ],
    },
    {
      category: "Users",
      items: [
        {
          subcategoryname: "Users",
          subjectnames: ["User-List", "Active-User", "Inactive-User"],
          icon: <PeopleIcon sx={{ color: iconColor }} />,
        },
      ],
    },
    {
      category: "Producers",
      items: [
        {
          subcategoryname: "Karigars",
          subjectnames: ["Karigar-List", "Active-Karigar", "Inactive-Karigar"],
          icon: <EngineeringIcon sx={{ color: iconColor }} />,
        },
      ],
    },
    {
      category: "Products",
      items: [
        {
          subcategoryname: "Categories",
          subjectnames: ["Category-List", "Active-Category", "Inactive-Category"],
          icon: <CategoryOutlinedIcon sx={{ color: iconColor }} />,
        },
        {
          subcategoryname: "VariantDetails",
          subjectnames: ["Gender", "Purity", "Color",'Dandi','Kunda','Size','GaugeSize','Weight'],
          icon: <CategoryOutlinedIcon sx={{ color: iconColor }} />,
        },
        // {
        //   subcategoryname: "Products",
        //   subjectnames: ["Product-List"],
        //   icon: <DetailsIcon sx={{ color: iconColor }} />,
        // },
      ],
    },
    {
      category: "Orders",
      items: [
        {
          subcategoryname: "Order",
          subjectnames: ["Order-List"],
          icon: <LocalMallIcon sx={{ color: iconColor }} />,
        },
      ],
    },
    {
      category: "Other Details",
      items: [
        {
          subcategoryname: "About",
          subjectnames: ["About"],
          icon: <InfoOutlinedIcon sx={{ color: iconColor }} />,
        },
        {
          subcategoryname: "Home Banner",
          subjectnames: ["Home-Banner"],
          icon: <ViewCarouselIcon sx={{ color: iconColor }} />,
        },
        {
          subcategoryname: "Privacy Policy",
          subjectnames: ["Privacy-Policy"],
          icon: <PolicyIcon sx={{ color: iconColor }} />,
        },
      ],
    },
  ];

  const DrawerList = (
    <List>
      <Card sx={{ p: 1 }}>
        {sidebarCategories.map((category, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <ListSubheader component="div" sx={{ fontWeight: "bold" }}>
              {category.category}
            </ListSubheader>
            {category.items.map((subject, subIndex) => (
              <Box key={subIndex}>
                <ListItem button onClick={() => handleClick(subject.subcategoryname)}>
                  {subject.icon}
                  <ListItemText primary={subject.subcategoryname} />
                  {open[subject.subcategoryname] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[subject.subcategoryname]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subject.subjectnames.map((subjectname, subSubIndex) => (
                      <ListItem
                        key={subSubIndex}
                        button
                        component={Link}
                        to={`/${subjectname.replace(/\s+/g, "-")}`}
                        sx={{ pl: 4 }}
                        onClick={() => {
                          if (!lockSidebar) {
                            setDrawerOpen(false);
                          }
                        }}
                      >
                        <ArrowRightOutlinedIcon sx={{ color: "black" }} />
                        <ListItemText primary={subjectname} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
          </Box>
        ))}
      </Card>
    </List>
  );

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button onClick={toggleDrawer}>
          <MenuIcon />
        </Button>
        <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
          Admin
        </Typography>
        <IconButton onClick={toggleLock}>
          {lockSidebar ? <Lock /> : <LockOpen />}
        </IconButton>
      </Box>
      <Drawer
        variant={lockSidebar ? "permanent" : "persistent"}
        open={drawerOpen || lockSidebar}
        sx={{
          width: lockSidebar || drawerOpen ? 240 : 0,
          transition: "width 0.3s",
          "& .MuiDrawer-paper": {
            width: lockSidebar || drawerOpen ? "16%" : 0,
            boxSizing: "border-box",
            color: "grey",
            height: "82%",
            mt: 2,
            overflowX: "hidden",
            marginTop: "40px",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
