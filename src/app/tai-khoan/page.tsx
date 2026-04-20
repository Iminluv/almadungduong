import { Metadata } from "next";
import AccountView from "./AccountView";

export const metadata: Metadata = {
  title: "Tài khoản của tôi",
  description: "Quản lý đơn hàng, địa chỉ và thông tin cá nhân của bạn tại Alma Dungduong.",
};

export default function AccountPage() {
  return <AccountView />;
}
