const DotIcon = (color?: string, width = "24", height = "24") => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width}`}
      height={`${height}`}
      fill={`${color}`}
      className="bi bi-dot"
      viewBox="0 0 16 16"
    >
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    </svg>
  );
};

const CheckCircleIcon = (color?: string, width = "24", height = "24") => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width}`}
      height={`${height}`}
      fill={`${color}`}
      className="bi bi-check-circle-fill"
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </svg>
  );
};

const XCircleIcon = (color?: string, width = "24", height = "24") => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width}`}
      height={`${height}`}
      fill={`${color}`}
      className="bi bi-x-circle-fill"
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
    </svg>
  );
};

export { DotIcon, XCircleIcon, CheckCircleIcon };
