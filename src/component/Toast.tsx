import React from 'react';

function Toast({ value, type = "default" }: { value: string; type: "danger" | "success" | "warning" | "default" }) {
    const baseClass = "alert fade show position-fixed top-0 end-0 m-3";
    const zIndexStyle = { zIndex: 9999 };

    const typeClass = {
        danger: "alert-danger",
        success: "alert-success",
        warning: "alert-warning",
        default: "alert-info",
    }[type];

    return (
        <div className={`${baseClass} ${typeClass}`} role="alert" style={zIndexStyle}>
            {value}
        </div>
    );
}

export default Toast;
