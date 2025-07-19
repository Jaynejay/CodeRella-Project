
const IconWithTooltip = ({ children, label }) => {
  return (
    <div className="relative group">
      {children}
      <span className="absolute z-10 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};

export default IconWithTooltip;
