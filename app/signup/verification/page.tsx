import SignupForm from "@/components/auth/signup-form";
import { VerificationForm } from "@/components/auth/verification-form";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

export default function VerificationPage() {
  return (
    <>
      <Navbar />
      <VerificationForm />
      <Footer />
    </>
  );
}
