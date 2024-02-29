import React from 'react';
import './Bell.css'

const BellIcon = ({ count }) => {
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg height="25px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
                <defs>
                    <style>
                        {`
                        .cls-1 {
                            fill: #fff;
                        }

                        .cls-2 {
                            fill: #ffbd29;
                        }

                        .cls-3 {
                            mask: url(#mask);
                        }

                        .cls-4 {
                            fill: #ffce20;
                        }

                        .cls-14,
                        .cls-5,
                        .cls-6 {
                            fill: none;
                        }

                        .cls-10,
                        .cls-5,
                        .cls-6 {
                            stroke: #124458;
                            stroke-width: 3px;
                        }

                        .cls-14,
                        .cls-6 {
                            stroke-linecap: round;
                        }

                        .cls-7 {
                            mask: url(#mask-2);
                        }

                        .cls-8 {
                            mask: url(#mask-3);
                        }

                        .cls-9 {
                            fill: #fff4ae;
                        }

                        .cls-10 {
                            fill: #cf3346;
                        }

                        .cls-11 {
                            mask: url(#mask-4);
                        }

                        .cls-12 {
                            fill: #ff5963;
                        }

                        .cls-13 {
                            mask: url(#mask-5);
                        }

                        .cls-14 {
                            stroke: #fff;
                            stroke-width: 6px;
                        }
                    `}
                    </style>
                    <mask id="mask" x="60" y="116" width="55" height="56" maskUnits="userSpaceOnUse">
                        <g id="alert-b">
                            <circle id="alert-a" className="cls-1" cx="85" cy="147" r="25" />
                        </g>
                    </mask>
                    <mask id="mask-2" x="70" y="0" width="24" height="25" maskUnits="userSpaceOnUse">
                        <g id="alert-d">
                            <circle id="alert-c" className="cls-1" cx="85" cy="16" r="9" />
                        </g>
                    </mask>
                    <mask id="mask-3" x="0" y="10" width="154" height="143" maskUnits="userSpaceOnUse">
                        <g id="alert-f">
                            <path id="alert-e" className="cls-1" d="M141,119q1.92,7.29,5.67,9.28h0A13.86,13.86,0,0,1,154,140.5,12.5,12.5,0,0,1,141.5,153H28.5A12.5,12.5,0,0,1,16,140.5,14,14,0,0,1,23.75,128q4-2,6.25-9V73.5a55.5,55.5,0,0,1,111,0Z" />
                        </g>
                    </mask>
                    <mask id="mask-4" x="101" y="12" width="56" height="56" maskUnits="userSpaceOnUse">
                        <g id="alert-h">
                            <circle id="alert-g" className="cls-1" cx="127" cy="42" r="26" />
                        </g>
                    </mask>
                    <mask id="mask-5" x="101" y="16" width="52" height="52" maskUnits="userSpaceOnUse">
                        <g id="alert-j">
                            <circle id="alert-i" className="cls-1" cx="127" cy="42" r="26" />
                        </g>
                    </mask>
                </defs>
                <title>Asset 1</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                        <g className="bell">
                            <g className="ball">
                                <circle id="alert-a-2" data-name="alert-a" className="cls-2" cx="85" cy="147" r="25" />
                                <g className="cls-3">
                                    <circle className="cls-4" cx="90" cy="141" r="25" />
                                </g>
                                <circle className="cls-5" cx="85" cy="147" r="25" />
                                <path className="cls-6" d="M84.5,164.5A16.5,16.5,0,0,1,68,148" />
                            </g>
                            <circle id="alert-c-2" data-name="alert-c" className="cls-2" cx="85" cy="16" r="9" />
                            <g className="cls-7">
                                <circle className="cls-4" cx="79" cy="9" r="9" />
                            </g>
                            <circle className="cls-5" cx="85" cy="16" r="7.5" />
                            <path id="alert-e-2" data-name="alert-e" className="cls-2" d="M29,119q-1.92,7.29-5.67,9.28h0A13.86,13.86,0,0,0,16,140.5,12.5,12.5,0,0,0,28.5,153h113A12.5,12.5,0,0,0,154,140.5,14,14,0,0,0,146.25,128q-4-2-6.25-9V73.5a55.5,55.5,0,0,0-111,0Z" />
                            <g className="cls-8">
                                <path className="cls-4" d="M13,111q-1.92,7.29-5.67,9.28h0A13.86,13.86,0,0,0,0,132.5,12.5,12.5,0,0,0,12.5,145h113A12.5,12.5,0,0,0,138,132.5,14,14,0,0,0,130.25,120q-4-2-6.25-9V65.5a55.5,55.5,0,0,0-111,0Z" />
                            </g>
                            <path className="cls-5" d="M30.45,119.38l.05-.19V73.5a54,54,0,0,1,108,0v45.73l.07.22c1.59,5,3.9,8.33,7,9.88a12.49,12.49,0,0,1,6.91,11.17,11,11,0,0,1-11,11H28.5a11,11,0,0,1-11-11A12.32,12.32,0,0,1,24,129.61C27,128,29.07,124.61,30.45,119.38Z" />
                            <path className="cls-9" d="M75.81,123.17q-9.68-.61-17.93-.33A153.63,153.63,0,0,0,42,124.23h0a4.6,4.6,0,0,0-4,4.71h0a3.62,3.62,0,0,0,3.75,3.49l.38,0A153.07,153.07,0,0,1,58.16,131q8.3-.28,18,.34h0a3.67,3.67,0,0,0,3.89-3.43c0-.12,0-.24,0-.36h0a4.55,4.55,0,0,0-4.25-4.37Z" />
                            <path className="cls-9" d="M47,62c-4-3.44-1.74-14.49,5-22.2s15.34-9.17,19.3-5.73-4.26,4.49-11,12.2S51,65.46,47,62Z" />
                            <circle className="cls-9" cx="47.14" cy="71.86" r="3.45" />
                            <path className="cls-6" d="M103.08,33a43.13,43.13,0,0,1,22.68,25.27" />
                        </g>
                        <g className="alert">
                            <circle id="alert-g-2" data-name="alert-g" className="cls-10" cx="127" cy="42" r="26" />
                            <g className="cls-11">
                                <circle className="cls-12" cx="131" cy="38" r="26" />
                            </g>
                            <circle id="alert-i-2" data-name="alert-i" className="cls-5" cx="127" cy="42" r="26" />
                            <g className="cls-13">
                                <path className="cls-14" d="M127.5,26.5v19m0,10V56" />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
           
        </div>
    );
};

export default BellIcon;
