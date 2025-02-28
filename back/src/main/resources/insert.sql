INSERT INTO estado (id_estado, nome, sigla) VALUES(99, 'Ignorado/exterior', 'IG');
INSERT INTO estado (id_estado, nome, sigla) VALUES(24, 'Rio Grande do Norte', 'RN');
INSERT INTO estado (id_estado, nome, sigla) VALUES(11, 'Rondônia', 'RO');
INSERT INTO estado (id_estado, nome, sigla) VALUES(12, 'Acre', 'AC');

INSERT INTO cidade (id_estado, nome) VALUES(24, 'Natal');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Acrelândia');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Assis Brasil');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Brasiléia');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Bujari');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Capixaba');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Cruzeiro do Sul');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Epitaciolândia');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Feijó');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Jordão');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Mâncio Lima');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Manoel Urbano');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Marechal Thaumaturgo');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Plácido de Castro');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Porto Acre');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Porto Walter');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Rio Branco');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Rodrigues Alves');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Santa Rosa');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Sena Madureira');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Senador Guiomard');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Tarauacá');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Xapuri');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'Acari');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'Açu');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'Afonso Bezerra');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'Água Nova');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'Alexandria');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'Almino Afonso');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'Alto do Rodrigues');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'Angicos');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'Vera Cruz');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'Viçosa');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'Vila Flor');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Abunã');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Alto Alegre dos Parecis');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Alta Floresta do Oeste');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Alto Paraíso');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Alvorada D''Oeste');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Ariquemes');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Colorado do Oeste');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Corumbiara');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Costa Marques');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Cujubim');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Espigão D''Oeste');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Governador Jorge Teixeira');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Guajará-Mirim');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Jaci Paraná');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Itapuã do Oeste');
INSERT INTO cidade (id_estado, nome) VALUES(11, 'Jaru');
INSERT INTO cidade (id_estado, nome) VALUES(12, 'Campinas');
INSERT INTO cidade (id_estado, nome) VALUES(24, 'EDUARDO GOMES');

INSERT INTO pessoa (celular, email, nome) VALUES('55996108568', 'daran@gmail.com', 'darlan da silva');
INSERT INTO endereco (id_cidade, cep, numero, bairro, complemento, logradouro) VALUES(1, '98690', '467', 'floresta', 'vado galpao vargas', 'rua são joao');
INSERT INTO funcionario (id_endereco, id_pessoa, status,dt_contratacao) VALUES(1, 1, 'ATV','2025-01-01');