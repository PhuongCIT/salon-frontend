const ServiceDescription = ({ description }) => (
  <>
    <p className="text-gray-700 font-medium mt-4 dark:text-white">Mô tả:</p>
    {description?.split(/[.]/).map(
      (item, index) =>
        item.trim() && (
          <p
            key={index}
            className="text-sm text-gray-600 max-w-[700px] mt-1 dark:text-white flex items-start"
          >
            <span className="mr-2">•</span>
            {item.trim()}
          </p>
        )
    )}
  </>
);
export default ServiceDescription;
