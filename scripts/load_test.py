from locust import HttpUser, task

class WebTask(HttpUser):
    @task
    def transaction(self):
        self.client.post(
            "/create",
            json={
                "additional_info": "-",
                "certificate_expiry_timestamp": 1622967475696,
                "digital_signature": "{\"message\":\"{\\\"encrypted_patient_id\\\":\\\"eyJhbGciOiJIUzI1NiJ9.MzUxNjExMjYxMDk4MDAx.Z541z1HJaXJA8Fq3rxkieiB3oYgBo_IWbJcqMmfJO_0\\\",\\\"test_taken_timestamp\\\":1622362675696,\\\"certificate_expiry_timestamp\\\":1622967475696,\\\"test_type\\\":\\\"Rapid Antibodi\\\",\\\"test_result\\\":\\\"Positive\\\",\\\"encrypted_external_data_pointer\\\":\\\"eyJhbGciOiJIUzI1NiJ9.aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZcmFaYkxDNFJ0aGVlZHBKQnk2U2pMalM5UVZhMVhuMUVlYWFoNnl4R0V2OQ.oxG7ycBZFSJfTeI6vYrO0hvFAguNh26-1sUYVha1_eU\\\",\\\"patient_home_address\\\":\\\"Jl. Cisitu Indah Gg. Masjid No. 21\\\",\\\"patient_gender\\\":\\\"Laki-laki\\\",\\\"patient_age\\\":\\\"22\\\",\\\"additional_info\\\":\\\"-\\\"}\",\"messageHash\":\"0xc53341c31c57e4025a3d7679e0e930e6fa2878a3f5aa7bfc605c2dd9a7f42b26\",\"v\":\"0x1c\",\"r\":\"0xe4ee14974564ebf9b748c97b3d324391aab9f5a820ff57c80d7da3edcf33dae1\",\"s\":\"0x33755c87d3b32d546c4ef213244f8d1a9453f0cd6ab9e7a34a6ad6347ca26af0\",\"signature\":\"0xe4ee14974564ebf9b748c97b3d324391aab9f5a820ff57c80d7da3edcf33dae133755c87d3b32d546c4ef213244f8d1a9453f0cd6ab9e7a34a6ad6347ca26af01c\"}",
                "encrypted_external_data_pointer": "eyJhbGciOiJIUzI1NiJ9.aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZcmFaYkxDNFJ0aGVlZHBKQnk2U2pMalM5UVZhMVhuMUVlYWFoNnl4R0V2OQ.oxG7ycBZFSJfTeI6vYrO0hvFAguNh26-1sUYVha1_eU",
                "encrypted_patient_id": "eyJhbGciOiJIUzI1NiJ9.MzUxNjExMjYxMDk4MDAx.Z541z1HJaXJA8Fq3rxkieiB3oYgBo_IWbJcqMmfJO_0",
                "patient_age": "22",
                "patient_gender": "Laki-laki",
                "patient_home_address": "Jl. Cisitu Indah Gg. Masjid No. 21",
                "test_result": "Positive",
                "test_taken_timestamp": 1622362675696,
                "test_type": "Rapid Antibodi",
                "address": "0xF6f9102D17e01Ca37131f05366040ddB7a9EC3f8"
            }
        )

    @task
    def ipfs(self):
        self.client.post("/ipfs")