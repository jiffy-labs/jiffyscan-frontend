// components/Paywall.js
import Button from "@/components/common/Button";
import {useRouter} from "next/router";

function Paywall() {
    const {asPath} = useRouter();
    return (
        <div className="z-10 absolute inset-1 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-semibold mb-4">Unlock Premium Content</h1>
                <p className="text-gray-600 mb-8">
                    Access exclusive data and more by login or register.
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
