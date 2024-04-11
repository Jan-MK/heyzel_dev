import icons from "../../utility/icons.jsx"

function Icon({type, width, measure, color = "currentColor", styling}) {
    width = width ? width + "" +  (measure || 'px') : "auto";
    console.log(width)
    let height = "auto";
    let icon = icons[type]

    let styledIcon = <svg className={styling || ""} stroke={color} fill={color} strokeWidth="0" viewBox={icon.viewbox} height={height}
                          display={"block"}
                          style={{verticalAlign: "middle", display: "block", lineHeight:"0", width: width, height: "auto"}}
                          width={width}
                          xmlns="http://www.w3.org/2000/svg">
        {icon.path}
    </svg>
    return (
        <>
            {styledIcon}
        </>
    );
}

export default Icon;