'use client';
import { useState } from "react";

export default function Verifyemail() {
    const [token, settoken] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative">
            <div className="ios-card max-w-3xl">
                <ul className="w-full flex flex-col items-center justify-center text-black py-5 px-3">
                    <h1 className="text-3xl leading-none text-center">Verify Your Email</h1>
                    <p className="mt-3 text-md text-black text-center leading-none">We've sent a verification link to your email address. Please check your inbox and click to verify your email.</p>
                    <p className="mt-3 text-sm text-center text-black/50 font-semibold">You will automatically redirect to the home page after verification.</p>
                </ul>
            </div>

            <style jsx>{`
        .ios-input {
          width: 100%;
          background: #111;
          border: 1px solid #333;
          border-radius: 0.5rem;
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          color: white;
        }
        .ios-input:focus {
          border-color: #10b981;
          outline: none;
        }
      `}</style>
        </div>
    );
}