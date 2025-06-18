import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useCallback } from "react";
import CardService from "../components/CardService";
import { AppContext } from "../context/AppContext";
import ServiceDescription from "../components/ServiceDescription";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ServicesDetail = () => {
  useEffect(() => {
    document.title = "SalonHair - Chi tiết dịch vụ";
  }, []);

  const navigate = useNavigate();
  const { id: serviceId } = useParams();
  const { services, formatPrice } = useContext(AppContext);
  const { user, baseURL } = useAuth();
  const defaultImage = "https://randomuser.me/api/portraits/men/2.jpg";

  const [serviceInfo, setServiceInfo] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200 && response.data.favorites) {
        setFavorites(response.data.favorites);
      }
    } catch (error) {
      console.error("Log Error: ", error.response?.data?.message);
    }
  }, [baseURL]);

  useEffect(() => {
    const fetchServiceInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);
        if (!Array.isArray(services) || !serviceId) {
          throw new Error("Dữ liệu dịch vụ hoặc ID không hợp lệ");
        }

        const serviceInfo = services.find((ser) => ser._id === serviceId);
        if (!serviceInfo) {
          throw new Error(`Không tìm thấy dịch vụ với ID: ${serviceId}`);
        }
        setServiceInfo(serviceInfo);

        const priceRange = 200000;
        const durationRange = 30;

        const related = services
          .filter((service) => {
            const isPriceInRange =
              Math.abs(service.price - serviceInfo.price) <= priceRange;
            const isDurationInRange =
              Math.abs(service.durationMinutes - serviceInfo.durationMinutes) <=
              durationRange;
            return (
              (isPriceInRange || isDurationInRange) &&
              service._id !== serviceInfo._id
            );
          })
          .slice(0, 4);

        setRelatedServices(related);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();

    fetchServiceInfo();
  }, [services, serviceId, user._id, fetchFavorites]);

  const isFavorite = favorites.some((fv) => fv.serviceId === serviceInfo?._id);

  // console.log("isFavorite ", isFavorite);

  const handleToggleFavorites = async () => {
    try {
      if (isFavorite) {
        const favoriteToRemove = favorites.find(
          (fav) => fav.serviceId === serviceInfo._id
        );
        const response = await axios.delete(
          `${baseURL}/favorites/${favoriteToRemove._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Đã bỏ yêu thích");
          fetchFavorites();
        } else {
          toast.error("Lỗi thêm yêu thích");
        }
      } else {
        const response = await axios.post(
          `${baseURL}/favorites`,
          {
            serviceId: serviceInfo._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Đã thêm vào yêu thích");
          fetchFavorites();
        } else {
          toast.error("Lỗi thêm yêu thích");
        }
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật danh sách yêu thích:", error);
      toast.error(error.response.data.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              Trang chủ
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link to="/services" className="text-blue-600 hover:underline">
              Dịch vụ
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-500" aria-current="page">
            {serviceInfo.name}
          </li>
        </ol>
      </nav>

      {/* Main content */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Image section */}
        <div className="w-full sm:w-1/3 lg:w-1/4">
          <img
            className="w-full h-auto rounded-lg shadow-md"
            src={serviceInfo.image || defaultImage}
            alt={serviceInfo.name}
          />
        </div>

        {/* Info section */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 dark:bg-gray-700">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {serviceInfo.name}
          </h1>
          <div className="mt-4 flex items-center">
            <span className="text-xl font-semibold text-red-600">
              {formatPrice(serviceInfo.price)} VND
            </span>
            <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full dark:bg-blue-900 dark:text-blue-100">
              {serviceInfo.duration} phút
            </span>
          </div>
          <ServiceDescription description={serviceInfo.description} />
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => navigate(`/booking/${serviceInfo._id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all"
            >
              Đặt lịch ngay
            </button>
            <button
              onClick={handleToggleFavorites}
              className={`border ${
                isFavorite ? "border-red-600" : "border-blue-600"
              } text-${
                isFavorite ? "red-600" : "blue-600"
              } hover:bg-blue-50 font-medium py-3 px-6 rounded-full transition-all dark:${
                isFavorite ? "text-red-300" : "text-blue-300"
              } dark:${
                isFavorite ? "border-red-300" : "border-blue-300"
              } dark:hover:bg-gray-600`}
            >
              {isFavorite ? "Đã yêu thích" : "Thêm vào yêu thích"}
            </button>
          </div>
        </div>
      </div>

      {/* Related services */}
      {relatedServices.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 dark:text-white">
            Dịch vụ bạn có thể quan tâm
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedServices.map((service) => (
              <CardService item={service} key={service._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesDetail;
