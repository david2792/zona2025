import React, { useEffect, useReducer, useRef } from 'react';
import useContextMenu from 'contextmenu';
import 'contextmenu/ContextMenu.css';
import './Tooth.css';

function Tooth({ number, positionX, positionY, onChange }) {
    const initialState = {
        number,
        diagnostics: {
            cavities: {
                center: false,
                top: false,
                bottom: false,
                left: false,
                right: false
            },
            extract: false,
            crown: false,
            filter: false,
            fracture: false,
            endodontics: false // Nuevo campo para endodoncia
        }
    };

    function reducer(toothState, action) {
        switch (action.type) {
            case 'corona':
                return { ...toothState, diagnostics: { ...toothState.diagnostics, crown: action.value }};
            case 'extraccion':
                return { ...toothState, diagnostics: { ...toothState.diagnostics, extract: action.value }};
            case 'filtracion':
                return { ...toothState, diagnostics: { ...toothState.diagnostics, filter: action.value }};
            case 'factura':
                return { ...toothState, diagnostics: { ...toothState.diagnostics, fracture: action.value }};
            case 'endodoncia':
                return { ...toothState, diagnostics: { ...toothState.diagnostics, endodontics: action.value }};
            case 'caries':
                return { ...toothState, diagnostics: { ...toothState.diagnostics, cavities: setCavities(toothState.diagnostics.cavities, action.zone, action.value) }};
            case 'limpiar':
                return initialState;
            default:
                throw new Error();
        }
    }

    const toggleCrown = () => ({ type: "corona", value: !toothState.diagnostics.crown });
    const toggleExtract = () => ({ type: "extraccion", value: !toothState.diagnostics.extract });
    const toggleFilter = () => ({ type: "filtracion", value: !toothState.diagnostics.filter });
    const toggleFracture = () => ({ type: "fractura", value: !toothState.diagnostics.fracture });
    const toggleEndodontics = () => ({ type: "endodoncia", value: !toothState.diagnostics.endodontics }); // Nueva función para endodoncia
    const toggleCavities = (zone) => ({ type: "caries", zone, value: !toothState.diagnostics.cavities[zone] });
    const clear = () => ({ type: "limpia" });

    const [toothState, dispatch] = useReducer(reducer, initialState);
    const [contextMenu, useCM] = useContextMenu({ submenuSymbol: '>' });

    const firstUpdate = useRef(true);
    const prevState = useRef(toothState);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (prevState.current !== toothState) {
            onChange(number, toothState);
            prevState.current = toothState;
        }
    }, [toothState, onChange, number]);

    // SubMenú de Diagnóstico
    const diagnosticoSubMenu = (place) => {
        return {
            'Caries': () => {
                dispatch(toggleCavities(place));
            },
            'Caries en todas las zonas': () => dispatch(toggleCavities('all')),
            'Ausente': () => dispatch(toggleExtract()),
            'Corona': () => dispatch(toggleCrown()),
            'Filtrado': () => dispatch(toggleFilter()),
            'Fractura': () => dispatch(toggleFracture()),
            'Endodoncia': () => dispatch(toggleEndodontics()), // Nueva opción para endodoncia
        }
    }

    // Menú Contextual Principal
    const menuConfig = (place) => {
        return {
            'Diagnóstico': diagnosticoSubMenu(place),
            'Limpiar Todo': () => dispatch(clear()),  // Opción para limpiar todo
        }
    };

    let getClassNamesByZone = (zone) => {
        if (toothState.diagnostics.cavities[zone]) {
            return 'caries';
        }
        return '';
    }

    // Posición del Diente
    const translate = `translate(${positionX},${positionY})`;

    return (
        <svg className="tooth">
            <g transform={translate}>
                <polygon
                    points="0,0 20,0 15,5 5,5"
                    onContextMenu={useCM(menuConfig('top'))}
                    className={getClassNamesByZone('top')}
                />
                <polygon
                    points="5,15 15,15 20,20 0,20"
                    onContextMenu={useCM(menuConfig('bottom'))}
                    className={getClassNamesByZone('bottom')}
                />
                <polygon
                    points="15,5 20,0 20,20 15,15"
                    onContextMenu={useCM(menuConfig('left'))}
                    className={getClassNamesByZone('left')}
                />
                <polygon
                    points="0,0 5,5 5,15 0,20"
                    onContextMenu={useCM(menuConfig('right'))}
                    className={getClassNamesByZone('right')}
                />
                <polygon
                    points="5,5 15,5 15,15 5,15"
                    onContextMenu={useCM(menuConfig('center'))}
                    className={getClassNamesByZone('center')}
                />
                <polygon
                    points="5,20 15,20 10,30" // Triángulo que representa la raíz
                    onContextMenu={useCM(menuConfig('root'))}
                    className={toothState.diagnostics.endodontics ? 'endodontics' : ''}
                />
                {drawToothActions()}
                <text
                    x="6"
                    y="40"
                    stroke="navy"
                    fill="navy"
                    strokeWidth="0.1"
                    className="tooth">
                    {number}
                </text>
            </g>
            {contextMenu}
        </svg>
    )

    function setCavities(prevState, zone, value) {
        if (zone === "all") {
            return {
                center: value,
                top: value,
                bottom: value,
                left: value,
                right: value
            };
        } else {
            return {
                ...prevState,
                [zone]: value
            };
        }
    }

    function drawToothActions() {
        const otherFigures = [];
        if (toothState.diagnostics.extract) {
            otherFigures.push(
                <g stroke="red" key="extract">
                    <line x1="0" y1="0" x2="20" y2="20" strokeWidth="2" />
                    <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
                </g>
            );
        }

        if (toothState.diagnostics.fracture) {
            otherFigures.push(
                <g stroke="red" key="fracture">
                    <line x1="0" y1="10" x2="20" y2="10" strokeWidth="2" />
                </g>
            );
        }

        if (toothState.diagnostics.filter) {
            otherFigures.push(
                <g stroke="red" key="filter">
                    <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
                </g>
            );
        }

        if (toothState.diagnostics.crown) {
            otherFigures.push(
                <circle
                    key="crown"
                    cx="10"
                    cy="10"
                    r="10"
                    fill="none"
                    stroke="red"
                    strokeWidth="2"
                />
            );
        }

        if (toothState.diagnostics.endodontics) {
            otherFigures.push(
                <g stroke="green" key="endodontics">
                    <line x1="10" y1="20" x2="10" y2="30" strokeWidth="2" />
                    <line x1="5" y1="30" x2="15" y2="30" strokeWidth="2" />
                </g>
            );
        }

        return otherFigures;
    }
}

export default Tooth;
