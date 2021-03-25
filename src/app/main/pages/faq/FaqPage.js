import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
// import Input from '@material-ui/core/Input';
// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
    header: {
        background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: theme.palette.primary.contrastText
    },
    panel: {
        margin: 0,
        borderWidth: '1px 1px 0 1px',
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
        '&:first-child': {
            borderRadius: '16px 16px 0 0'
        },
        '&:last-child': {
            borderRadius: '0 0 16px 16px',
            borderWidth: '0 1px 1px 1px'
        },
        '&$expanded': {
            margin: 'auto'
        }
    },
    expanded: {}
}));

function FaqPage() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [searchText] = useState('');

    useEffect(() => {
        axios.get('/api/faq').then(res => {
            setData(res.data);
        });
    }, []);

    useEffect(() => {
        function getFilteredArray(arr, _searchText) {
            if (_searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, _searchText);
        }

        setFilteredData(getFilteredArray(data, searchText));
    }, [data, searchText]);

    const toggleExpansion = panel => (event, _expanded) => {
        setExpanded(_expanded ? panel : false);
    };

    console.log(expanded)

    // function handleSearch(event) {
    //  setSearchText(event.target.value);
    // }

    return (
        <div className="w-full flex flex-col flex-auto">
            <div
                className={clsx(
                    classes.header,
                    'flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360'
                )}
            >
                <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                    <Typography color="inherit" className="text-36 sm:text-56 font-light">
                        FAQ
                    </Typography>
                </FuseAnimate>

                <FuseAnimate duration={400} delay={600}>
                    <Typography
                        variant="subtitle1"
                        color="inherit"
                        className="opacity-75 mt-8 sm:mt-16 mx-auto max-w-512"
                    >
                        Frequently asked questions
                    </Typography>
                </FuseAnimate>
            </div>

            <div className="flex flex-col flex-1 flex-shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
                {filteredData.length === 0 && (
                    <div className="flex flex-auto items-center justify-center w-full h-full">
                        <Typography color="textSecondary" variant="h5">
                            There are no faqs!
                        </Typography>
                    </div>
                )}
                <FuseAnimateGroup
                    enter={{
                        animation: 'transition.slideUpBigIn'
                    }}
                >
                            <ExpansionPanel
                                classes={{
                                    root: classes.panel,
                                    expanded: classes.expanded
                                }}
                                key='1'
                                // expanded={expanded}
                                onChange={toggleExpansion(1)}
                                elevation={0}
                            >
                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <div className="flex items-center">
                                        <Icon color="action">help_outline</Icon>
                                        <Typography className="px-8">Who is Easy Alfred?</Typography>
                                    </div>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                                    <Typography className="">Easy Alfred is a team of service industry experts. We're people who work restaurants, retail, front of house, back of house and everywhere between. We're locals and regulars. We're people who think local, stay local, be local.</Typography>
                                    {/* <Typography className="">Travellers: We support your vacation by setting you up in all the wonderful ways you wish to eat, relax, explore, and experience at your rental. We want you to have the best time with your friends and family. Rest Easy. We’ve got ya! 
                                    <br/>
                                    <br/>
                                    Local Business: All those people who travel to your area come for a reason. Let us help make your business a reason to visit your hometown. We’re a customer service focused Local Business Lead Generator. We empower local businesses to do what you do best. 
                                    <br/>
                                    <br/>
                                    Local Rental Owners: Real Estate helps you grow your world.. Make it work for you in more ways than one. By signing up with Easy Alfred, you earn new revenue with every experience made by your guests. And we work with insured, local businesses who are invested in the community just like you. Local businesses who seek to provide the best experience.
                                    </Typography> */}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            <ExpansionPanel
                                classes={{
                                    root: classes.panel,
                                    expanded: classes.expanded
                                }}
                                key='2'
                                // expanded={expanded}
                                onChange={toggleExpansion(2)}
                                elevation={0}
                            >
                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <div className="flex items-center">
                                        <Icon color="action">help_outline</Icon>
                                <Typography className="px-8">What does my Alfred Do?</Typography>
                                    </div>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                            <Typography className="">If you’re a guest: We support your vacation by setting you up in all the wonderful ways you wish to eat, relax, explore, and experience at your rental. We want you to have the best time with your friends and family. Rest Easy. We’ve got ya!
                            <br />
                            <br />
                            If you own a short-term rental: Real Estate helps you grow your world. Make it work for you in more ways than one. By signing up with Easy Alfred, you earn new revenue with every experience made by your guests. And we work with insured, local businesses who are invested in the community just like you. Local businesses who seek to provide the best experience.
                            </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
            
                            <ExpansionPanel
                                classes={{
                                    root: classes.panel,
                                    expanded: classes.expanded
                                }}
                                key='3'
                                // expanded={expanded}
                                onChange={toggleExpansion(3)}
                                elevation={0}
                            >
                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <div className="flex items-center">
                                        <Icon color="action">help_outline</Icon>
                                <Typography className="px-8">How does Easy Alfred work?</Typography>
                                    </div>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                                    <td>
                                        <tr>
                                        <Typography className="w-full">
                                            We’re your local concierge and travel guide. Need a meal? We'll organize it. Need a massage? We’ll order it. We’ve got an Alfred for every occasion.
                                            </Typography>
                                        <br/>
                                        </tr>
                                        <tr>
                                        <br/>
                                    <Card className="h-256 rounded-8 shadow-none border-1"
                                        style={{ "max-width": "600px"}}
                                    >
                                        <CardMedia
                                            component='iframe'
                                            title='test'
                                            width="100%;"
                                            height="100%;"
                                            src='https://www.youtube.com/embed/SGCpGmVQYmA'
                                        />
                                    </Card>

                                        </tr>
                                    </td>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            
                            <ExpansionPanel
                                classes={{
                                    root: classes.panel,
                                    expanded: classes.expanded
                                }}
                                key='4'
                                onChange={toggleExpansion(4)}
                                elevation={0}
                            >
                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <div className="flex items-center">
                                        <Icon color="action">help_outline</Icon>
                                <Typography className="px-8">What do I need to do?</Typography>
                                    </div>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                            <Typography className="">Pick from our list of services, identifying high-level information we need to start this process. Then, we’ll have a quick call with Alfred to ensure we’ve got the details. We coordinate with local businesses in exchange for a fee to make sure you can focus on your travel rather than spend it planning and managing your day. The services are then scheduled through the app on your calendar of upcoming events. You don’t need to keep your regular schedule. You’re on holiday! Rest Easy!</Typography>
                                    {/* <Typography className="">We work to find the best local businesses so you don’t have to. Coordinating with your Short Term rental owner, our team of researchers, and through our 30+ years of collective experience working with local businesses, we want your travel experience to be the best seek to find you the best. 
                                    <br/>
                                    <br/>
                                    Here’s where we’re honest with you. We know that every experience includes the characters and needs of all parties. Like is not made of perfect experiences. With
                                    </Typography> */}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            <ExpansionPanel
                                classes={{
                                    root: classes.panel,
                                    expanded: classes.expanded
                                }}
                                key='5'
                                // expanded={expanded}
                                onChange={toggleExpansion(5)}
                                elevation={0}
                            >
                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <div className="flex items-center">
                                        <Icon color="action">help_outline</Icon>
                                <Typography className="px-8">What’s the advantage of Easy Alfred over other services?</Typography>
                                    </div>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                            <Typography className="">Why would you want to work on vacation? Hunting for the best business is time consuming. Let us take the weight off your shoulders. Don’t spend your days on Google, Yelp, TripAdvisor and other review services. Our team of local business experts set you up with simple options to choose from based on your budget and needs. All you need to do is let us know what you’re looking to do and when.</Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                           
                            <ExpansionPanel
                                classes={{
                                    root: classes.panel,
                                    expanded: classes.expanded
                                }}
                                key='6'
                                // expanded={expanded}
                                onChange={toggleExpansion(6)}
                                elevation={0}
                            >
                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <div className="flex items-center">
                                        <Icon color="action">help_outline</Icon>
                                <Typography className="px-8">How do I pay?</Typography>
                                    </div>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                            <Typography className="">
                            We’ve contracted with the local businesses we pair with you. Whether you’re visiting an office/studio/restaurant/off-site location or the service is in home, just put it on your Alfred! Let the business know your name and you’re staying with Easy Alfed.
                            <br/>
                            <br/>
                            All invoices are cleared with you and any payment made through your Stripe secured card on file. 
                            <br/>
                            <br/>
                            All invoices are available here in your profile. We believe in full transparency. We believe in transparency with costs of goods, fees and other primary business roles involved with your customer experience. 
                            </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            <ExpansionPanel
                                classes={{
                                    root: classes.panel,
                                    expanded: classes.expanded
                                }}
                                key='7'
                                // expanded={expanded}
                                onChange={toggleExpansion(7)}
                                elevation={0}
                            >
                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <div className="flex items-center">
                                        <Icon color="action">help_outline</Icon>
                                <Typography className="px-8">Our current structure is as follows:</Typography>
                                    </div>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                                    <Typography className="">
                                    {/* <br/>
                                    <br/>
                                    We currently charge guests a ___% fee for all purchased services. These fees are sometimes waived for discount offers and other various reasons.
                                    <br/>
                                    <br/>
                                    We currently receive a ____% commission for warm leads for our vendors upon guest purchase.
                                    <br/>
                                    <br/>
                                    All guests are entered into the Community Dividends program which will pay ____% of all data sales dividend for the use of your personal data. Your data should earn you money.
                                    <br/>
                                    <br/>
                                    We currently pay a ___% revenue share from all transaction fees to each rental or boutique property owner (AKA a Power Partner vendor) from our transaction fees.
                          */}
                                    <ul>
                                        <li>
                                        a. We currently charge a guest fee of 5% for all purchased services. These fees are sometimes waived for discount offers and other various reasons that will be spelled out on an individual basis.
                                        </li>
                                        <br/>
                                        <li>
                                        b. We currently receive a 15% commission for customer service connections with our Power Partners. These businesses are recommended by our community representatives, local reviews, and our analysis/internal review process we seek from you, our guest. 
                                        </li>
                                        <br/>
                                        <li>
                                        c. We do take tips for our customer service. This will be clearly marked separately on our invoice and through notifications.
                                        </li>
                                        <br/>
                                        <li>
                                        d. All tips for your local business will be noted separately and are paid directly to business.  
                                        </li>
                                        <br/>
                                        <li>
                                        e. We appreciate your vacation rental property owner for allowing us to serve your travel needs. The world of vacation rentals is a great opportunity for private citizens to increase personal success. We currently pay a 35-49% revenue share from all transaction fees to each rental or boutique property owner (AKA a power partner vendor) from our transaction fees in exchange for connecting us to you, our guest.
                                        </li>
                                        <br/>
                                        <li>
                                        f. If you own a property and want to add revenue opportunities for you. Please
                                        <a href="https://easyalfred.com/rental-owners/" rel="noopener noreferrer" target="_blank"> contact us here.</a>
                                        </li>
                                        <br/>
                                        <li>
                                        g. If you are in the customer service business or work in local retail business and would like a work-from-anywhere position, 
                                        <a href="http://hiring.easyalfred.com/" rel="noopener noreferrer" target="_blank"> contact us here.</a>
                                        </li>
                                    </ul>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                                
                        {/* ));
                    }, [filteredData, classes, expanded])} */}
                </FuseAnimateGroup>
            </div>
        </div>
    );
}

export default FaqPage;

