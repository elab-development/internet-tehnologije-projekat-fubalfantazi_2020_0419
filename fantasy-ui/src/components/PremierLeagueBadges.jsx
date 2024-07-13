import React from 'react';

const PremierLeagueBadges = () => {
    const listOfClubs = [
        {
            name: 'Arsenal',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t3.png',
            link: 'http://www.arsenal.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Aston Villa',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t7.png',
            link: 'https://www.avfc.co.uk?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'AFC Bournemouth',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t91.png',
            link: 'https://www.afcb.co.uk?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Brentford',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t94.png',
            link: 'https://www.brentfordfc.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Brighton & Hove Albion',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t36.png',
            link: 'https://www.brightonandhovealbion.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Chelsea',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t8.png',
            link: 'https://www.chelseafc.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Crystal Palace',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t31.png',
            link: 'http://www.cpfc.co.uk?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Everton',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t11.png',
            link: 'http://www.evertonfc.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Fulham',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t54.png',
            link: 'https://www.fulhamfc.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Ipswich Town',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t40.png',
            link: 'https://www.itfc.co.uk?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Leicester',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t13.png',
            link: 'https://www.lcfc.com?lang=en?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Liverpool',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t14.png',
            link: 'http://www.liverpoolfc.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Manchester City',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t43.png',
            link: 'https://www.mancity.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Manchester United',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t1.png',
            link: 'http://www.manutd.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Newcastle United',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t4.png',
            link: 'https://www.newcastleunited.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Nottingham Forest',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t17.png',
            link: 'https://www.nottinghamforest.co.uk?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Southampton',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t20.png',
            link: 'https://www.southamptonfc.com/en?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Tottenham Hotspur',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t6.png',
            link: 'http://www.tottenhamhotspur.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'West Ham United',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t21.png',
            link: 'http://www.whufc.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        },
        {
            name: 'Wolverhampton Wanderers',
            badge: 'https://resources.premierleague.com/premierleague/badges/50/t39.png',
            link: 'https://www.wolves.co.uk?utm_source=premier-league-website&utm_campaign=website&utm_medium=link'
        }
    ];
    return (
        <>
            <ul className="premier-league-badges">
                {
                    listOfClubs.map((club, index) => (
                        <li key={index}>
                            <a href={club.link} target="_blank" rel="noreferrer">
                                <img src={club.badge
                                } alt={club.name} />
                            </a>
                        </li>
                    ))
                }
            </ul>
        </>
    );
};

export default PremierLeagueBadges;