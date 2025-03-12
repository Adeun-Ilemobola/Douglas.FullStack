import React from 'react';

interface NoteMapLogoProps {
    /** Color for the folder background and note lines */
    primaryColor?: string;
    /** Color for the note paper background */
    secondaryColor?: string;
    /** Color for the map pin marker */
    accentColor?: string;
    width?: number;
    height?: number;
}

const NoteMapLogo: React.FC<NoteMapLogoProps> = ({primaryColor = '#007BFF', secondaryColor = '#FFF', accentColor = '#FF5722', width = 200, height = 200,}) => (
    <svg width={width} height={height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Folder shape: represents the container for notes */}
        <polygon
            points="20,60 20,150 180,150 180,60 110,60 100,40 20,40"
            fill={primaryColor}
        />

        {/* Note paper inside the folder */}
        <rect
            x="30"
            y="70"
            width="140"
            height="70"
            rx="5"
            ry="5"
            fill={secondaryColor}
            stroke={primaryColor}
            strokeWidth="2"
        />

        {/* Simulated text lines on the note */}
        <line x1="40" y1="85" x2="160" y2="85" stroke={primaryColor} strokeWidth="1" strokeDasharray="2,2" />
        <line x1="40" y1="100" x2="160" y2="100" stroke={primaryColor} strokeWidth="1" strokeDasharray="2,2" />
        <line x1="40" y1="115" x2="160" y2="115" stroke={primaryColor} strokeWidth="1" strokeDasharray="2,2" />

        {/* Map pin icon to emphasize dynamic organization */}
        <g transform="translate(130, 80)">
            {/* Pin drop shape */}
            <path
                d="M10,0
           C15,0 15,10 10,15
           C5,10 5,0 10,0
           Z"
                fill={accentColor}
            />
            {/* Pin inner circle */}
            <circle cx="10" cy="5" r="2" fill="#FFF" />
        </g>
    </svg>

);

export default NoteMapLogo;
