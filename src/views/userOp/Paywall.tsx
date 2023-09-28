// components/Paywall.js
import Button from "@/components/common/Button";
import {useRouter} from "next/router";

function Paywall() {
    const {asPath} = useRouter();
    return (
        <div className="absolute z-10 flex flex-col items-center justify-center inset-x-1 bottom-1">
            <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                <h1 className="mb-4 text-3xl font-semibold">Kindly Login</h1>
                <p className="mb-8 text-gray-600">
                    Sign In to Continue.
                </p>
                <div className={'inline-flex'}>
                    <div className={'mr-4'}>
                        <Button
                            href={`/login?callBack=${encodeURIComponent(asPath)}`}>
                            Login
                        </Button>
                    </div>
                    <Button
                        href={`/register?callBack=${encodeURIComponent(asPath)}`}>
                        Register
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Paywall
