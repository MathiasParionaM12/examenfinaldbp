import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { apiError } from "../api";
import Pagination from "../components/Pagination";
import type { Item } from "../types";

export default function ListPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError('');
            try {
                const { data } = await api.get(`/mentors?page=${page}&size=5`);
setItems(data.items);
    
            setTotalPages(data.totalPages);
            } catch (err) {
                setError(apiError(err).message);
            } 
