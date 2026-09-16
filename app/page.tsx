import CustomerForm from "@/public/components/CustomerForm";
import Greeting from "@/public/components/Greeting";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <main>
        <Greeting />
        <CustomerForm />
      </main>
    </div>
  );
}
