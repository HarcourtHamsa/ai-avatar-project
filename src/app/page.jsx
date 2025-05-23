'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';
import Input from '@/components/input';
import { Routes } from '@/constants';

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        emailAddress: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(
                auth,
                formData.emailAddress,
                formData.password
            );
            router.push(Routes.dashboard);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cLightOrange p-6">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 bg-red-100 px-4 py-2 rounded-lg text-sm mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        label="Email"
                        name="emailAddress"
                        type="email"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        label="Continue"
                        theme="primary"
                        isLoading={loading}
                        type="submit" />
                </form>
            </div>
        </div>
    );
}


export default Page;